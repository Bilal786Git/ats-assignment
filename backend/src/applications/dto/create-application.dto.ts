export interface CreateApplicationDto {
  jobId: string;
  name: string;
  email: string;
  phone?: string;
  resume: string;
  coverLetter?: string;
}
