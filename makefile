.PHONY: help schema admin public
.DEFAULT_GOAL := help

admin:
	npm run dev:admin

public:
	npm run dev:public

REPO=https://github.com/gon-papa/momonga_blog
BRANCH ?=main
schema:
	rm -rf momonga_blog
	rm -f ./openapi.yml
	git clone -b $(BRANCH) $(REPO)
	rm -rf packages/api
	mv momonga_blog/openapi.yml .
	rm -rf momonga_blog
	npx openapi-ts -i openapi.yml -o packages/api -c @hey-api/client-fetch;