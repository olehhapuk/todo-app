import { Box, Button, Text, Input, Checkbox } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';

function TaskCard({ _id, text, completed, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      text,
    },
    onSubmit: handleEdit,
  });

  useEffect(() => {
    if (isEditing) {
      formik.setValues({ text });
    }
  }, [isEditing]);

  function handleEdit(values) {
    setIsEditing(false);
    onEdit(_id, { text: values.text, completed });
  }

  function handleToggleComplete(e) {
    const isChecked = e.target.checked;
    onEdit(_id, { text, completed: isChecked });
  }

  function startEditing() {
    setIsEditing(true);
  }

  return (
    <Box
      display="flex"
      gridGap={3}
      borderWidth="1px"
      borderRadius="lg"
      py={3}
      px={5}
    >
      {isEditing ? (
        <Box
          as="form"
          display="flex"
          width="100%"
          gridGap={3}
          onSubmit={formik.handleSubmit}
        >
          <Input
            type="text"
            name="text"
            display="block"
            width="100%"
            value={formik.values.text}
            onChange={formik.handleChange}
          />
          <Button type="submit" colorScheme="green">
            Save
          </Button>
        </Box>
      ) : (
        <Box display="flex" width="100%" alignItems="center" gridGap={3}>
          <Checkbox isChecked={completed} onChange={handleToggleComplete} />
          <Text width="100%">{text}</Text>
          <Button type="button" colorScheme="teal" onClick={startEditing}>
            Edit
          </Button>
        </Box>
      )}
      <Button type="button" colorScheme="red" onClick={() => onDelete(_id)}>
        Delete
      </Button>
    </Box>
  );
}

export default TaskCard;
