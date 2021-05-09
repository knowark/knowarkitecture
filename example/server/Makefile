PROJECT = tutorark
COVFILE ?= .coverage
TESTS ?= tests/
PART ?= patch


coverage:
	export COVERAGE_FILE=$(COVFILE); pytest --cov-branch \
	--cov=$(PROJECT) $(TESTS) --cov-report term-missing -x -s \
	-vv -o cache_dir=/tmp/$(PROJECT)/cache

coverage-application:
	export COVERAGE_FILE=$(COVFILE); \
	pytest --cov-branch --cov=$(PROJECT)/application tests/application/ \
	--cov-report term-missing -x -s -W ignore::DeprecationWarning \
	-o cache_dir=/tmp/$(PROJECT)/cache

clean:
	find . -name '__pycache__' -exec rm -fr {} +
	rm -rf ./.cache .mypy_cache ./schema/.mypy_cache .coverage

serve:
		python -m $(PROJECT) serve

push:
		git push origin HEAD && git push --tags

version:
		bump2version $(PART) $(PROJECT)/__init__.py --tag --commit

uninstall:
		pip freeze | xargs pip uninstall -y

install:
		pip install -r requirements.txt
