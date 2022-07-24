import {
  Group,
  Text,
  useMantineTheme,
  MantineTheme,
  Stack,
  Image,
} from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon } from 'tabler-icons-react';
import {
  Dropzone,
  DropzoneStatus,
  IMAGE_MIME_TYPE,
  MIME_TYPES,
} from '@mantine/dropzone';
import { useState } from 'react';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme,
  errors,
  file
) => (
  <Stack
    align="center"
    justify="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: 'none', textAlign: 'center' }}
  >
    {file ? (
      <Image
        src={typeof file === 'object' ? URL.createObjectURL(file) : file}
      />
    ) : (
      <>
        <ImageUploadIcon
          status={status}
          style={{ color: getIconColor(status, theme) }}
          size={80}
        />

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            image should not exceed 2mb
          </Text>
          {errors ? (
            <Text color="red" mt={16}>
              {errors.message}
            </Text>
          ) : null}
        </div>
      </>
    )}
  </Stack>
);

type FileInputProps = {
  onChange: (file: File) => void;
  value: File | string;
};
export default function FileInput({ onChange, value }: FileInputProps) {
  const theme = useMantineTheme();
  const [file, setFile] = useState<File | string>(value);
  const [fileRejection, setFileRejection] = useState(null);
  return (
    <Dropzone
      onDrop={(files) => {
        setFileRejection(null);
        setFile(files[0]);
        onChange(files[0]);
      }}
      onReject={(files) => {
        setFile(null);
        setFileRejection(files[0].errors[0]);
      }}
      maxSize={2 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      {(status) => dropzoneChildren(status, theme, fileRejection, file)}
    </Dropzone>
  );
}
