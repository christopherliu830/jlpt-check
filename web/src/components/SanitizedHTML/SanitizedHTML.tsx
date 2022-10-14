import * as DOMPurify from 'dompurify';

const defaultOptions: DOMPurify.Config = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'u'],
  ALLOWED_ATTR: ['href'],
};

const sanitize = (dirty: string, options?: any) => ({
  // Technically toString isn't needed here but TypeScript isn't picking it up the correct return type.
  __html: DOMPurify.sanitize(dirty, { ...defaultOptions, ...options, RETURN_TRUSTED_TYPE: false }).toString(),
});

export default function SanitizedHTML({ html, options }: { html: string; options?: any }) {
  return <div dangerouslySetInnerHTML={sanitize(html, options)} />;
}
