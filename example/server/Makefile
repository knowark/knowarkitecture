PROJECT = tutorark
COVFILE ?= .coverage
TESTS ?= tests/
PART ?= patch

clean:
	find . -name '__pycache__' -exec rm -fr {} +
	rm -rf ./.cache .mypy_cache ./schema/.mypy_cache .coverage

serve:
	tutorark serve

check:
	npm run check

test:
	npm run test

push:
	git push origin HEAD && git push --tags

version:
	npm version $(PART)

install:
	npm install

link:
	npm link

unlink:
	npm unlink tutorark

container:
	setup/deploy/container.sh

deploy:
	setup/deploy/deploy.js
