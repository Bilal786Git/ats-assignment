import * as Yup from "yup";

interface JobApplySchema {
  coverRequired?: boolean;
  resumeRequired?: boolean;
}

export const jobApplySchema = ({
  coverRequired,
  resumeRequired,
}: JobApplySchema) =>
  Yup.object({
    name: Yup.string().trim().min(1, "Name is required").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    coverLetter: coverRequired
      ? Yup.string()
          .trim()
          .min(1, "Cover letter is required")
          .required("Required")
      : Yup.string(),
    resume: resumeRequired
      ? Yup.mixed().required("Resume is required")
      : Yup.mixed(),
  });
