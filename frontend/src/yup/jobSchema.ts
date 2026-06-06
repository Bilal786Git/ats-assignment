import * as Yup from "yup";
import { JobTypes, JobStatus, LocationType } from "@ats/constants/jobs-meta";

export const jobSchema = Yup.object({
  title: Yup.string().min(2, "Title too short").required("Required"),
  description: Yup.string()
    .min(10, "Description too short")
    .required("Required"),
  payStartRange: Yup.number().min(0, "Must be positive").required("Required"),
  payEndRange: Yup.number().min(0, "Must be positive").required("Required"),
  location: Yup.string().min(2, "Location too short").required("Required"),
  jobType: Yup.string().oneOf(Object.values(JobTypes)).required("Required"),
  locationType: Yup.string()
    .oneOf(Object.values(LocationType))
    .required("Required"),
  status: Yup.string().oneOf(Object.values(JobStatus)).required("Required"),
});
