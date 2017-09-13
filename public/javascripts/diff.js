		$(document).ready(function () {
			let $select = $("select[class*=flexselect]")
			var editor = $('#compare');
			editor.mergely({
				width: 'auto',
				height: 'auto', // containing div must be given a height
				cmsettings: { readOnly: false },
			});
			var lhs_url = 'moons_lhs.txt';
			var rhs_url = 'moons_rhs.txt';

			var lhs = function(deferred) {
				editor.mergely('lhs', 'loading diff...');
			};

			var rhs = function(deferred) {
				editor.mergely('rhs', 'loading diff...');
			};
			var d1 = $.Deferred();
			var d2 = $.Deferred();
			$.when(
			    d1, d2
			).done(function(lhs_response, rhs_response) {
				editor.mergely('lhs', lhs_response);
				editor.mergely('rhs', rhs_response);
			});
			lhs(d1);
			rhs(d2);
			$textarea = $('#convertBox')
			$('#lfbtn').on('click', function() {
				let a = $textarea.val()
				a = a.replace(/\t/g, ' ')
				editor.mergely('lhs', a);
			})
			$('#rgbtn').on('click', function() {
				let a = $textarea.val()
				a = a.replace(/\t/g, ' ')
				editor.mergely('rhs', a);
			})
			function checkFileList(files) {
				if (typeof window.FileReader !== 'function')
					error_msg("The file API isn't supported on this browser yet.");

				if (files.length>0) readFile(files[0], "lhs");
				if (files.length>1) readFile(files[1], "rhs");
			}

			function readFile(file, side) {
				var reader = new FileReader();
				reader.onload = function file_onload() {
					// document.getElementById('td1').innerHTML = ..
					$('#path-'+side).text(file.name);
					$('#compare').mergely(side, reader.result);
				}
				reader.readAsBinaryString(file);

			}
      // fetch('/webAutomation/diff/sipai/Fund/getNavList.html?id=HF00002DA5&muid=210628&page=2', {
      //   method: 'GET',
      //   credentials: 'same-origin',
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8'
      //   }
      // }).then((response) => {
      //   return response.json()
      // }).then((res) => {
      //   console.log(res)
      // })
      $.ajax({
        url: '/Fund/getNavList.html?id=HF00002DA5&muid=210628&page=2',
        type: 'GET',
				xhrFields: {
            withCredentials: true
        },
        success: function (res) {
          console.log(res)
        }
      })
			$.ajax({
				url: '/fund/ajax/gmfund/history/FHuobi.htm?jjdm=160716&flag=1',
				type: 'GET',
				success: function(res) {
					// console.log(res)
				}
			})

			$('#searchInput').keyup(function() {
				let val = encodeURIComponent($(this).val())
				$.ajax({
					url: '/searchdata.do?callback=jQuery17107055063048641996_1505115415606&q=' + val + '&fq=100%2C300%2C500%2C700%2C800&_=1505115446373',
					// url: '/index.php?m=Search&c=search&a=quickSearch&count=10&callback=jQuery172022642931159252533_1505093137228&search_type=all&skeyword=' + val + '&_=1505106847634',
					type: 'GET',
					success: function(res) {
						if (res) {
							let str = res.match(/content:'(\S*)\'}/)[1]
							console.log(str)
							let list = JSON.parse(str)
							console.log(list)
							$('option').remove()
							if (list.length) {
								list.forEach(function(item, index) {
									console.log(item)
									var $option = $('<option/>').val(item.id).text(item.tsshortName)
									$select.append($option)
								})
							}
							// $select.flexselect();
						}
					}
				})
			})
			$select.change(function() {
				console.log($(this).val())
			})
			function download_content(a, side) {
				//a.innerHTML = "preparing content..";
				var txt = $('#compare').mergely('get', side);
				var datauri = "data:plain/text;charset=UTF-8," + encodeURIComponent(txt);
				a.setAttribute('download', side+".txt");
				a.setAttribute('href', datauri);
				//a.innerHTML = "content ready.";
			}
			// $('#compare').mergely('options', { ignorews: true });
			// document.getElementById('save-lhs').addEventListener('mouseover', function() { download_content(this, "lhs"); }, false);
			// document.getElementById('save-rhs').addEventListener('mouseover', function() { download_content(this, "lhs"); }, false);
		});