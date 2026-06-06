'use client';

interface FileUploadFieldProps {
  label: string;
  error?: string;
  accept?: string;
  onChange: (file: File | null) => void;
}

export function FileUploadField({ label, error, accept = '.pdf,.doc,.docx', onChange }: FileUploadFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        style={{
          fontSize: 13,
          color: '#6b7280',
        }}
      />
      {error && <span style={{ fontSize: 12, color: '#dc2626' }}>{error}</span>}
    </div>
  );
}
