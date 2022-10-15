import * as DOMPurify from 'dompurify';

const defaultOptions: DOMPurify.Config = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'u'],
  ALLOWED_ATTR: ['href'],
};

const sanitize = (dirty: string, options?: any) => ({
  __html: DOMPurify.sanitize(dirty, { ...defaultOptions, ...options, RETURN_TRUSTED_TYPE: false }),
});

export default function SanitizedHTML({ html, options }: { html: string; options?: any }) {
  // @ts-ignore Sanitize returns string correctly.
  return <div dangerouslySetInnerHTML={sanitize(html, options)} />;
}
