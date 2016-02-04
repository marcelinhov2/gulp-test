BO=node_modules/.bin/bower
GU=node_modules/.bin/gulp
KA=node_modules/karma/bin/karma

setup:
	npm install
	@$(BO) install
	@$(GU) dependencies

server:
	@$(GU) up

compile:
	@$(GU) compile

build:
	@$(GU) build