import { NewProjectForm } from "./_components/new-project-form";

const NewProjectPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        新しいプロジェクト
      </h1>
      <NewProjectForm />
    </div>
  );
};

export default NewProjectPage;
