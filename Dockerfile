FROM pmaugeri/alpine-akamai-cli:version6
RUN mkdir /root/openapi-proxy
ADD openapi-proxy.js /root/openapi-proxy
#RUN ln -s /root/data/.edgerc /root/.edgerc
ENTRYPOINT ["/usr/bin/node"]
CMD ["/root/openapi-proxy/openapi-proxy.js"]
