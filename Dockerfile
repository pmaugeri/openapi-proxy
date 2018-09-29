FROM pmaugeri/alpine-akamai-cli:version6
RUN mkdir /root/openapi-proxy
ADD openapi-proxy.js /root/openapi-proxy
ENTRYPOINT ["/usr/bin/node"]
CMD ["/root/openapi-proxy/openapi-proxy.js"]
