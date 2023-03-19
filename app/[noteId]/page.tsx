import React from "react";

type Props = {
  params: {
    noteId: string;
  };
};

const NotePage = ({ params: { noteId } }: Props) => {
  console.log(noteId);

  return <div>{noteId}</div>;
};

export default NotePage;
