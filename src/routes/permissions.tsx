import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createFileRoute } from '@tanstack/react-router';
import { useFormik } from 'formik';

export const Route = createFileRoute('/permissions')({
  component: () => <Permissions />
});

const Permissions = () => {
  const { handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold ">Permissions</h2>
      <form className="space-y-3">
        <Input name="username" placeholder="Username" onChange={handleChange} />
        <Input name="password" placeholder="Password" onChange={handleChange} />
        <Button type="button" onClick={() => handleSubmit()}>
          Login
        </Button>
      </form>
    </div>
  );
};
