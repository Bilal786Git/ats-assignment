"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import { Button } from "@ats/components/ui/Button/Button";
import { Input } from "@ats/components/ui/Input/Input";
import { Select } from "@ats/components/ui/Select/Select";
import { TextArea } from "@ats/components/ui/TextArea/TextArea";
import { FormFieldToggle } from "@ats/components/forms/FormFieldToggle/FormFieldToggle";
import { useApi } from "@ats/hooks/useApi";
import type { Job } from "@ats/types";
import { jobSchema } from "@ats/yup/jobSchema";
import styles from "./JobForm.module.less";
import { JobStatus, JobTypes, LocationType } from "@ats/constants/jobs-meta";

interface JobFormProps {
  initialData?: Job;
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
        resumeRequired: initialData.resumeRequired,
        coverRequired: initialData.coverRequired,
      }
    : {
        title: "",
        description: "",
        payStartRange: 0,
        payEndRange: 0,
        location: "",
        jobType: JobTypes.full_time,
        locationType: LocationType.remote,
        status: JobStatus.draft,
        resumeRequired: false,
        coverRequired: false,
      };

  const handleSubmit = async (values: typeof initialValues) => {
    if (values.payEndRange < values.payStartRange) {
      alert("End pay must be >= start pay");
      return;
    }
    try {
      if (initialData) {
        await request("PATCH", `/jobs/${initialData.id}`, values);
        alert("Job updated successfully");
      } else {
        await request("POST", "/jobs", values);
        alert("Job created successfully");
      }
      router.push("/admin/jobs");
    } catch {
      alert(`Failed to ${initialData ? "update" : "create"} job`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={jobSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
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
                    { value: JobTypes.full_time, label: "Full-time" },
                    { value: JobTypes.part_time, label: "Part-time" },
                    { value: JobTypes.internship, label: "Internship" },
                    { value: JobTypes.contract, label: "Contract" },
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
                    { value: LocationType.remote, label: "Remote" },
                    { value: LocationType.onsite, label: "On-site" },
                    { value: LocationType.hybrid, label: "Hybrid" },
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
                    { value: JobStatus.draft, label: "Draft" },
                    { value: JobStatus.pending, label: "Pending" },
                    { value: JobStatus.live, label: "Live" },
                    { value: JobStatus.closed, label: "Closed" },
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
              checked={values.coverRequired ?? false}
              onChange={(value) => setFieldValue("coverRequired", value)}
            />
            <FormFieldToggle
              label="Resume / CV"
              description="Require applicants to upload their resume"
              checked={values.resumeRequired ?? false}
              onChange={(value) => setFieldValue("resumeRequired", value)}
            />
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
