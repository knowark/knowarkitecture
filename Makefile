PROJECT = knowarkitecture


clean:
	find . -name '__pycache__' -exec rm -fr {} +
	rm -rf ./.cache .mypy_cache ./schema/.mypy_cache .coverage

push:
		git push origin HEAD && git push --tags
