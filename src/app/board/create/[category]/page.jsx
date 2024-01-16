"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BoardCreateForm from "@/components/Board/BoardCreateForm";

const Create = ({ params }) => {
  return (
    <>
      <BoardCreateForm />
    </>
  );
};

export default Create;
