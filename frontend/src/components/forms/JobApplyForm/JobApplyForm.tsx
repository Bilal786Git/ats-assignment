"use client";

import { Formik, Form, Field } from "formik";
import { Button } from "@ats/components/ui/Button/Button";
import { Input } from "@ats/components/ui/Input/Input";
import { TextArea } from "@ats/components/ui/TextArea/TextArea";
import { FileUploadField } from "@ats/components/forms/FileUploadField/FileUploadField";
import { useApi } from "@ats/hooks/useApi";
import type { Job } from "@ats/types";
import styles from "./JobApplyForm.module.less";
import { jobApplySchema } from "@ats/yup/jobApplySchema";

interface JobApplyFormProps {
  job: Job;
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormValues {
  name: string;
  email: string;
  coverLetter: string;
  resume: string;
  jobId: string;
}

export function JobApplyForm({ job, onSuccess, onCancel }: JobApplyFormProps) {
  const { request, loading } = useApi();

  const initialValues: FormValues = {
    name: "",
    email: "",
    coverLetter: "",
    resume: "",
    jobId: job.id,
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      await request("POST", "/applications/create", values);
      alert("Application submitted successfully!");
      onSuccess();
    } catch {
      alert("Failed to submit application");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={jobApplySchema({
        coverRequired: job.coverRequired,
        resumeRequired: job.resumeRequired,
      })}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, handleSubmit }) => {
        return (
          <Form className={styles.form}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>
              Apply Now
            </h3>

            <div className={styles.grid}>
              <Field
                as={Input}
                name="name"
                label="Full Name"
                placeholder="John Doe"
                error={touched.name && errors.name ? errors.name : ""}
              />
              <Field
                as={Input}
                name="email"
                type="email"
                label="Email"
                placeholder="john@company.com"
                error={touched.email && errors.email ? errors.email : ""}
              />
            </div>

            {job?.coverRequired && (
              <Field
                as={TextArea}
                name="coverLetter"
                label="Cover Letter"
                placeholder="Tell us why you're a great fit..."
                error={
                  touched.coverLetter && errors.coverLetter
                    ? errors.coverLetter
                    : ""
                }
              />
            )}

            {job?.resumeRequired && (
              <FileUploadField
                label="Resume / CV"
                error={touched.resume && errors.resume ? errors.resume : ""}
                onChange={(f) => setFieldValue("resume", f)}
              />
            )}

            <div className={styles.actions}>
              <Button
                type="primary"
                loading={loading}
                onClick={() => handleSubmit()}
              >
                Submit Application
              </Button>
              <Button type="default" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
