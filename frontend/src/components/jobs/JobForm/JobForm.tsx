"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@ats/components/ui/Button/Button";
import { Input } from "@ats/components/ui/Input/Input";
import { Select } from "@ats/components/ui/Select/Select";
import { TextArea } from "@ats/components/ui/TextArea/TextArea";
import { FormFieldToggle } from "@ats/components/forms/FormFieldToggle/FormFieldToggle";
import { DynamicFieldsBuilder } from "@ats/components/forms/DynamicFieldsBuilder/DynamicFieldsBuilder";
import { useApi } from "@ats/hooks/useApi";
import { toast } from "@ats/components/ui/Toast/Toast";
import type { Job, JobFormConfig } from "@ats/types";
import styles from "./JobForm.module.less";

const jobSchema = Yup.object({
  title: Yup.string().min(2, "Title too short").required("Required"),
  description: Yup.string()
    .min(10, "Description too short")
    .required("Required"),
  payStartRange: Yup.number().min(0, "Must be positive").required("Required"),
  payEndRange: Yup.number().min(0, "Must be positive").required("Required"),
  location: Yup.string().min(2, "Location too short").required("Required"),
  jobType: Yup.string()
    .oneOf(["full-time", "part-time", "internship"])
    .required("Required"),
  locationType: Yup.string()
    .oneOf(["remote", "on-site", "hybrid"])
    .required("Required"),
  status: Yup.string()
    .oneOf(["draft", "pending", "live", "closed"])
    .required("Required"),
});

interface JobFormProps {
  initialData?: Job;
}

function createDefaultConfig(): JobFormConfig {
  return {
    coverLetterEnabled: false,
    resumeRequired: true,
    customFields: [],
  };
}

export function JobForm({ initialData }: JobFormProps) {
  const router = useRouter();
  const { request, loading } = useApi<Job>();

  const initialValues = initialData
    ? {
        title: initialData.title,
        description: initialData.description,
        payStartRange: initialData.payStartRange,
        payEndRange: initialData.payEndRange,
        location: initialData.location,
        jobType: initialData.jobType,
        locationType: initialData.locationType,
        status: initialData.status,
      }
    : {
        title: "",
        description: "",
        payStartRange: 0,
        payEndRange: 0,
        location: "",
        jobType: "full-time" as const,
        locationType: "remote" as const,
        status: "draft" as const,
      };

  const [formConfig, setFormConfig] = React.useState<JobFormConfig>(
    initialData?.formConfig || createDefaultConfig(),
  );

  const handleSubmit = async (values: typeof initialValues) => {
    if (values.payEndRange < values.payStartRange) {
      toast("error", "End pay must be >= start pay");
      return;
    }
    try {
      const payload = { ...values, formConfig };
      if (initialData) {
        await request("PATCH", `/jobs/${initialData.id}`, payload);
        toast("success", "Job updated successfully");
      } else {
        await request("POST", "/jobs", payload);
        toast("success", "Job created successfully");
      }
      router.push("/admin/jobs");
    } catch {
      toast("error", `Failed to ${initialData ? "update" : "create"} job`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={jobSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Job Details</h3>
            <div className={styles.grid}>
              <div>
                <Field
                  as={Input}
                  name="title"
                  label="Job Title"
                  placeholder="e.g. Senior Software Engineer"
                  error={touched.title && errors.title ? errors.title : ""}
                />
              </div>
              <div>
                <Field
                  as={Select}
                  name="jobType"
                  label="Job Type"
                  options={[
                    { value: "full-time", label: "Full-time" },
                    { value: "part-time", label: "Part-time" },
                    { value: "internship", label: "Internship" },
                  ]}
                  error={
                    touched.jobType && errors.jobType ? errors.jobType : ""
                  }
                />
              </div>
              <div>
                <Field
                  as={Input}
                  name="payStartRange"
                  label="Pay Range (Start)"
                  type="number"
                  placeholder="50000"
                  error={
                    touched.payStartRange && errors.payStartRange
                      ? errors.payStartRange
                      : ""
                  }
                />
              </div>
              <div>
                <Field
                  as={Input}
                  name="payEndRange"
                  label="Pay Range (End)"
                  type="number"
                  placeholder="120000"
                  error={
                    touched.payEndRange && errors.payEndRange
                      ? errors.payEndRange
                      : ""
                  }
                />
              </div>
              <div>
                <Field
                  as={Input}
                  name="location"
                  label="Location"
                  placeholder="e.g. San Francisco, CA"
                  error={
                    touched.location && errors.location ? errors.location : ""
                  }
                />
              </div>
              <div>
                <Field
                  as={Select}
                  name="locationType"
                  label="Location Type"
                  options={[
                    { value: "remote", label: "Remote" },
                    { value: "on-site", label: "On-site" },
                    { value: "hybrid", label: "Hybrid" },
                  ]}
                  error={
                    touched.locationType && errors.locationType
                      ? errors.locationType
                      : ""
                  }
                />
              </div>
              <div>
                <Field
                  as={Select}
                  name="status"
                  label="Status"
                  options={[
                    { value: "draft", label: "Draft" },
                    { value: "pending", label: "Pending" },
                    { value: "live", label: "Live" },
                    { value: "closed", label: "Closed" },
                  ]}
                  error={touched.status && errors.status ? errors.status : ""}
                />
              </div>
            </div>
            <div className={styles.fullWidth} style={{ marginTop: 16 }}>
              <Field
                as={TextArea}
                name="description"
                label="Job Description"
                placeholder="Describe the role, responsibilities, and requirements..."
                error={
                  touched.description && errors.description
                    ? errors.description
                    : ""
                }
              />
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Application Form Builder</h3>
            <FormFieldToggle
              label="Cover Letter"
              description="Require applicants to submit a cover letter"
              checked={formConfig.coverLetterEnabled}
              onChange={(v) =>
                setFormConfig({ ...formConfig, coverLetterEnabled: v })
              }
            />
            <FormFieldToggle
              label="Resume / CV"
              description="Require applicants to upload their resume"
              checked={formConfig.resumeRequired}
              onChange={(v) =>
                setFormConfig({ ...formConfig, resumeRequired: v })
              }
            />
            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                marginTop: 16,
                paddingTop: 16,
              }}
            >
              <DynamicFieldsBuilder
                fields={formConfig.customFields}
                onChange={(fields) =>
                  setFormConfig({ ...formConfig, customFields: fields })
                }
              />
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/jobs")}
            >
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              {initialData ? "Update Job" : "Create Job"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
