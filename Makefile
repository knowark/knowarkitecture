PROJECT = knowarkitecture

push:
		git push origin HEAD && git push --tags

gitmessage:
	touch .gitmessage
	echo "\n# commit message\n.gitmessage" >> .gitignore
	git config commit.template .gitmessage
