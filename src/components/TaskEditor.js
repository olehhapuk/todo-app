import { Box, Input, Button } from '@chakra-ui/react';
import { useFormik } from 'formik';

function TaskEditor({ onCreate }) {
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: onCreate,
  });

  return (
    <Box
      as="form"
      display="flex"
      gridGap="4"
      mb={3}
      onSubmit={formik.handleSubmit}
    >
      <Input
        type="text"
        placeholder="Text"
        name="text"
        autoComplete="off"
        value={formik.values.text}
        onChange={formik.handleChange}
      />
      <Button type="submit">Create</Button>
    </Box>
  );
}

export default TaskEditor;
