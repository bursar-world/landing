import { Action } from './_components/action';
import { Eyebrow } from './_components/eyebrow';
import { SiteHeader } from './_components/site-header';

export default function SiteNotFound() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page">
        <Eyebrow>404 / Page not found</Eyebrow>
        <h1>
          This route
          <br />
          ends here.
        </h1>
        <p style={{ marginBottom: 35 }}>Return to Bursar or open your workspace.</p>
        <Action href="/">Back to Bursar</Action>
      </main>
    </>
  );
}
