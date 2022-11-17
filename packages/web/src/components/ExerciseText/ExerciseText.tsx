import React from 'react';
import parse, { Element } from 'html-react-parser';
import DOMPurify from 'dompurify';
import { BlankSpace } from 'components/BlankSpace/BlankSpace';

// Need this to make typescript select the correct overload.
type UntrustedConfig = DOMPurify.Config & {
  RETURN_TRUSTED_TYPE: false;
  RETURN_DOM_FRAGMENT?: false | undefined;
  RETURN_DOM?: false | undefined;
};

const defaultOptions: UntrustedConfig = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'u', 'ruby', 'rbc', 'rb', 'rtc', 'rt'],
  ADD_TAGS: ['blank-space'],
  ALLOWED_ATTR: ['href'],
  RETURN_TRUSTED_TYPE: false,
};

const sanitize = (dirty: string, options?: UntrustedConfig) => {
  const opts: UntrustedConfig = { ...defaultOptions, ...options };
  return DOMPurify.sanitize(dirty, opts);
};

export function ExerciseText({ children, fillBlanks }: { children: string; fillBlanks?: boolean }) {
  children = sanitize(children, { ...defaultOptions });

  let i = 0;
  const html = parse(children, {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.tagName === 'blank-space') {
        return <BlankSpace index={i++} fill={fillBlanks} />;
      }
    },
  });

  return <>{html}</>;
}
