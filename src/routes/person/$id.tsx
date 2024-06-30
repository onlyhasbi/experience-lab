import { createFileRoute, useRouter } from '@tanstack/react-router';
import { ContentLayout } from '../../layout/content';

export const Route = createFileRoute('/person/$id')({
  component: () => <DetailPerson />
});

function DetailPerson() {
  const { id } = Route.useParams();
  const { history } = useRouter();

  return (
    <ContentLayout>
      <span className="text-xs cursor-pointer hover:underline" onClick={() => history.back()}>
        Back
      </span>
      <div className="text-3xl font-medium my-5">Hello {id}</div>
    </ContentLayout>
  );
}
