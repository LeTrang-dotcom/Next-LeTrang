"use client";

import { useParams, useRouter } from "next/navigation";

export default function About() {
  const params = useParams();
  const { id } = params;
  return <div>Post Page {id}</div>;
}
