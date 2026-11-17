# Featured Chat Templates

Create JSON templates for `about-me`, `projects`, `experience`, `products`, and `contact`.

Recommended shape:

```json
{
  "id": "projects",
  "title": "My Projects",
  "description": "Explore selected projects",
  "messages": [
    {
      "id": "message-1",
      "role": "user",
      "content": "Tell me about your projects."
    },
    {
      "id": "message-2",
      "role": "assistant",
      "content": "Here is an overview based on the published project information."
    }
  ]
}
```

Populate assistant messages only with owner-verified facts. Keep templates immutable; continuing a template creates a separate visitor conversation.
