export default function Page({ params, searchParams }) {
  return (
    <div>
      <h1>{params.id}</h1>
      <p>{searchParams.id}</p>
    </div>
  );
}
