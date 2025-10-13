MODULE_DIR := modules

init: smart-wallet

smart-wallet:
	cd $(MODULE_DIR)/smart-wallet && forge build