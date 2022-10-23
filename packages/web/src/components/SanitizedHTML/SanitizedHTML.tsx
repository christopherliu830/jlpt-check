import React from 'react';
import * as DOMPurify from 'dompurify';

// Need this to make typescript select the correct overload.
type UntrustedConfig = DOMPurify.Config & {
  RETURN_TRUSTED_TYPE: false;
  RETURN_DOM_FRAGMENT?: false | undefined;
  RETURN_DOM?: false | undefined;
};

const defaultOptions: UntrustedConfig = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'u', 'ruby', 'rbc', 'rb', 'rtc', 'rt'],
  ALLOWED_ATTR: ['href'],
  RETURN_TRUSTED_TYPE: false,
};

const sanitize = (dirty: string, options?: UntrustedConfig) => {
  const opts: UntrustedConfig = { ...defaultOptions, ...options };
  return {
    __html: DOMPurify.sanitize(dirty, opts),
  };
};

export default function SanitizedHTML({ html, options }: { html: string; options?: UntrustedConfig }) {
  return <div dangerouslySetInnerHTML={sanitize(html, options)} />;
}
