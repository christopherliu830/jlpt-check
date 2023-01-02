import { Button, Container, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export default function Contact() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: text.toString()
    })

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Container maxW="4xl" centerContent alignItems="stretch">
        <Text fontSize="4xl" my={8}>Contact</Text>
        <Text>Thanks for the feedback!</Text>
      </Container>
    )
  }

  return (
    <Container maxW="4xl" centerContent alignItems="stretch">
      <Text fontSize="4xl" my={8}>Contact</Text>
      <Textarea my={4} value={text} onChange={(e) => setText(e.target.value)}></Textarea>
      <Button disabled={loading} onClick={handleSubmit}>Submit</Button>
    </Container>
  )
}