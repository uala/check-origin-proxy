# Check Origin Proxy

This nodejs app allows to proxy any service checking for a specific origin.
This is not like a CORS check, this is a manual check on the origin of the request.
This means that the request can be done only from another allowed website and no server side requests are permitted.

You can start this service with these env variables:
- HOST=<Url of the service you want to proxy>
- CREDENTIALS=<Basic auth of the service, if needed>
- ALLOWED_ORIGINS=<list origins allowed, comma separated

Example:

```
# Run on port 888
docker run -p 888:80 \
-e HOST=https://www.your-protected-service.com \
-e CREDENTIALS=user:password \
-e ALLOWED_ORIGINS=https://www.your-exposed-site.com \
 leen15/check-origin-proxy

# Any request made to localhost:888 will be forwarded to www.your-protected-service.com only if it's coming by www.your-exposed-site.com
```
