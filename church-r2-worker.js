export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Decode the pathname to handle spaces and special characters
    const key = decodeURIComponent(url.pathname.slice(1));
    const object = await env.ASSETS.get(key);
    if (object === null) {
      return new Response('Not found', { status: 404 });
    }

    // Guess content type if not set in metadata
    let contentType = object.httpMetadata?.contentType;
    if (!contentType) {
      if (key.endsWith('.mp3')) contentType = 'audio/mpeg';
      else if (key.endsWith('.wav')) contentType = 'audio/wav';
      else if (key.endsWith('.m4a')) contentType = 'audio/mp4';
      else if (key.endsWith('.aac')) contentType = 'audio/aac';
      else if (key.endsWith('.png')) contentType = 'image/png';
      else if (key.endsWith('.jpg') || key.endsWith('.jpeg')) contentType = 'image/jpeg';
      else if (key.endsWith('.gif')) contentType = 'image/gif';
      else if (key.endsWith('.webp')) contentType = 'image/webp';
      else contentType = 'application/octet-stream';
    }

    return new Response(object.body, {
      headers: {
        'content-type': contentType,
        'cache-control': 'public, max-age=31536000',
        'Access-Control-Allow-Origin': '*', // <-- CORS header for browser access
      },
    });
  },
}; 