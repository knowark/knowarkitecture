PROJECT = tutorark
COVFILE ?= .coverage
TESTS ?= tests/
PART ?= patch

clean:
	find . -name '__pycache__' -exec rm -fr {} +
	rm -rf ./.cache .mypy_cache ./schema/.mypy_cache .coverage

serve:
	python -m $(PROJECT) serve

test:
	npm run test

push:
	git push origin HEAD && git push --tags

version:
	npm version $(PART)

install:
	npm install
