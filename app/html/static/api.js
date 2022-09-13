const healthStatus = async () => {
    const response = await fetch('api/v2/status/health');
    const responseJson = await response.json(); //extract JSON from the http response


    if (responseJson.status == "OK") {
        document.getElementById("status").innerHTML = "Online";
        document.getElementById('status').classList.remove('is-danger');
        document.getElementById('status').classList.add('is-success');
    } else {
        document.getElementById("status").innerHTML = "Offline";
        document.getElementById('status').classList.remove('is-success');
        document.getElementById('status').classList.add('is-danger');

    }

    if (responseJson.services.neo4j.status == "connected") {
        document.getElementById("database_status").innerHTML = "Connected";
        document.getElementById('database_status').classList.remove('is-danger');
        document.getElementById('database_status').classList.add('is-success');
        document.getElementById("database_version").innerHTML = "v " + responseJson.services.neo4j.version;
    } else {
        document.getElementById("database_status").innerHTML = "Disconnected";
        document.getElementById('database_status').classList.remove('is-success');
        document.getElementById('database_status').classList.add('is-danger');
        document.getElementById("database_version").innerHTML = " - ";

    }

    if (responseJson.services.swate == "disconnected") {
        document.getElementById("swate_status").innerHTML = "Disconnected";
        document.getElementById("swate_version").innerHTML = "-";
        document.getElementById('swate_status').classList.remove('is-success');
        document.getElementById('swate_status').classList.add('is-danger');

    } else {
        document.getElementById("swate_version").innerHTML = "v " + responseJson.services.swate;
        document.getElementById("swate_status").innerHTML = "Connected";
        document.getElementById('swate_status').classList.remove('is-danger');
        document.getElementById('swate_status').classList.add('is-success');
    }


    // document.getElementById("broker_status").innerHTML = responseJson.services.rabbitmq;
    // document.getElementById('broker_status').classList.remove('is-success');
    // document.getElementById('broker_status').classList.add('is-warning');

}


const StatusInformation = async () => {
    const response = await fetch('api/v2/status/info');
    const responseJson = await response.json(); //extract JSON from the http response

    document.getElementById("number_terms").innerHTML = responseJson.number_terms.toLocaleString();
    document.getElementById("number_ontologies").innerHTML = responseJson.number_ontologies.toLocaleString();
    document.getElementById("number_relationships").innerHTML = responseJson.number_relationships.toLocaleString();
    document.getElementById("number_templates").innerHTML = responseJson.number_templates.toLocaleString();
    // document.getElementById("db_url").innerHTML = responseJson.db_url;
}


const Activities = async () => {
    const response = await fetch('/api/v2/activities/actions/');
    const responseJson = await response.json();

    console.log(responseJson)


    for (var i=0; i<responseJson.length; i++) {
        const el = document.createElement('div');
        el.textContent = responseJson[i].message
        el.textContent = responseJson[i].color

                  const results = document.getElementById('activity_area');
          results.appendChild(el);


    }


    //     for (var i = 0; i < responseJson.length; i++) {
    //       console.log(responseJson[i]);
    //       // const el = document.createElement('div');
    //       // el.textContent = responseJson[i]
    //       // const results = document.getElementById('results');
    //       // results.appendChild(el);
    // }

}

const query_term = async () => {
console.log("sending term")
    query = document.getElementById("query_input").value
    console.log("query term", query)
    const response = await fetch(`api/v2/search/find?q=${query}`);
    const responseJson = await response.json(); //extract JSON from the http response

//    document.getElementById("results").innerHTML = responseJson.results;
    // document.getElementById("db_url").innerHTML = responseJson.db_url;

    result =  responseJson.results;

     const results = document.getElementById('results');
       while (results.firstChild) {
    results.removeChild(results.lastChild);
  }




    console.log("results", result)

    for (var i = 0; i < result.length; i++) {
          console.log(result[i]);
          const el = document.createElement('div');
          el.textContent = result[i]
          const results = document.getElementById('results');
          results.appendChild(el);
    }

}


window.onload = function () {
    healthStatus();
    StatusInformation();
    Activities();
};



setInterval(healthStatus, 1000);
setInterval(StatusInformation, 1000);
// setInterval(Activities, 1000);

// addEventListener('query_input', query_term);