import Layout from "~/components/Layout";
import { FC } from "react";
import Editor from "~/components/Editor/Editor";

//todo: load inital md from file?

const EditorPage: FC = () => (
  <Layout>
    <Editor />
  </Layout>
);

export default EditorPage;
