window.addEventListener("DOMContentLoaded", function () {
  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;
  let e = 0;

  document.querySelector("#styled").addEventListener("click", function () {
    let same = false;
    // 入力した値取得
    const id = document.querySelector("#ids").value;
    console.log(id);
    if (id == "") {
      same = true;
    }
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (id === key) {
        same = true;
      }
    }

    const name = document.querySelector("#names").value;
    console.log(name);
    const kana = document.querySelector("#kanas").value;
    console.log(kana);
    const email = document.querySelector("#emails").value;
    console.log(email);
    const kikkake = document.querySelector("#kikakes").value;
    console.log(kikkake);

    // 志望動機
    const checks = document.getElementsByClassName("checks");
    let str = "";

    for (i = 0; i < checks.length; i++) {
      if (checks[i].checked === true) {
        str += checks[i].value + " ";
      }
    }
    console.log(str);

    const syosai = document.querySelector("#syosai").value;
    console.log(syosai);

    if (!same) {
      // LocalStrageへ入力
      const value = [name, kana, email, kikkake, str, syosai];
      const change = JSON.stringify(value);
      localStorage.setItem(id, change);
      const html = `
    <tr>
      <td>${id}</td>
      <td>${value[0]}</td>
      <td>${value[1]}</td>
      <td>${value[2]}</td>
      <td>${value[3]}</td>
      <td>${value[4]}</td>
      <td>${value[5]}</td>
    </tr>
    `;
      jQuery("#data").append(html);
      alert("送信されました");
    } else if (same) {
      alert("IDが記載されていないか、すでに使用されているIDです");
    }
  });

  //3.ページ読み込み：保存データ取得表示
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const array = JSON.parse(value);
    const html = `
    <tr>
      <td>${key}</td>
      <td>${array[0]}</td>
      <td>${array[1]}</td>
      <td>${array[2]}</td>
      <td>${array[3]}</td>
      <td>${array[4]}</td>
      <td>${array[5]}</td>
    </tr>
    `;
    jQuery("#data").append(html);

    if (array[3] == "a") {
      a += 1;
    } else if (array[3] == "b") {
      b += 1;
    } else if (array[3] == "c") {
      c += 1;
    } else if (array[3] == "d") {
      d += 1;
    } else if (array[3] == "e") {
      e += 1;
    }
  }

  document.querySelector("#cleardata").addEventListener("click", function () {
    localStorage.clear();
    $("#data").empty();
  });

  document.querySelector(".v").addEventListener("click", function () {
    jQuery(".result").slideDown(2000);
  });
  document.querySelector(".j").addEventListener("click", function () {
    jQuery(".result").slideUp(2000);
  });

  var ctx = document.getElementById("mychart");
  var myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["a", "b", "c", "d", "e"],
      datasets: [
        {
          data: [a, b, c, d, e],
          backgroundColor: ["#f88", "#484", "#48f", "#00FFFF", "#0F0"],
          weight: 100,
        },
      ],
    },
  });

  // チャートを更新する
  myChart.update();
});
