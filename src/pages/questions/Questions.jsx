import React, { useState } from "react";
import "./questions.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const CombinedQuestions = () => {
  // State to store the selected option for the first question
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");
  const [selectedOption4, setSelectedOption4] = useState("");
  const [selectedOption5, setSelectedOption5] = useState("");
  const [selectedOption6, setSelectedOption6] = useState("");
  const [userInput1, setUserInput1] = useState("");
  const [userInput2, setUserInput2] = useState("");
  const [userInput3, setUserInput3] = useState("");
  const [numStoreys, setNumStoreys] = useState(0);
  const [storeysData, setStoreysData] = useState(
    Array(parseInt(numStoreys, 10) || 0)
      .fill()
      .map(() => ({ weight: "", height: "", fx: "" }))
  );

  const handleSaveAsPDF = async () => {
    const content = document.querySelector('.values'); // Get the content to convert

    const opt = {
      margin: 22,
      filename: 'Specified_Lateral_Earthquake_Force.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Create a canvas from the content
    const canvas = await html2canvas(content);

    // Convert canvas to an image
    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    // Create a PDF instance
    const pdf = new jsPDF(opt.jsPDF);

    // Add the image to the PDF
    pdf.addImage(imgData, 'JPEG', opt.margin, opt.margin, pdf.internal.pageSize.getWidth() - 2 * opt.margin, pdf.internal.pageSize.getHeight() - 2 * opt.margin);

    // Save the PDF
    pdf.save(opt.filename);

    // Add the "clicked" class to initiate the animation
    const button = document.querySelector('.save-pdf-button');
    button.classList.add('clicked');

    // Remove the "clicked" class after a short delay to reset the animation
    setTimeout(() => {
      button.classList.remove('clicked');
    }, 300);
  };


  const [rd, setRd] = useState(0);
  const [ro, setRo] = useState(0);
  const [mvs, setMvs] = useState(0);
  const [calculatedValues, setCalculatedValues] = useState(null);

  // Function to handle the option selection for the first question
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getSelectedCityText = () => {
    if (selectedOption) {
      const selectedOptionElement = document.querySelector(
        `option[value="${selectedOption}"]`
      );
      return selectedOptionElement.textContent;
    }
    return "";
  };

  // Function to handle the option selection for the second question
  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  // Function to handle the option selection for the third question
  const handleOptionChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

  const handleOptionChange4 = (event) => {
    const selectedValue = event.target.value;
    const selectedText = event.target.options[event.target.selectedIndex].text;
    setSelectedOption4({ value: selectedValue, text: selectedText });
  };

  const handleOptionChange5 = (event) => {
    const selectedValue = event.target.value;
    const selectedText = event.target.options[event.target.selectedIndex].text;
    setSelectedOption5({ value: selectedValue, text: selectedText });
  };

  const handleOptionChange6 = (event) => {
    setSelectedOption6(event.target.value);
    const selectedOptionElement =
      event.target.options[event.target.selectedIndex];
    const newRd = parseFloat(selectedOptionElement.getAttribute("data-rd"));
    const newRo = parseFloat(selectedOptionElement.getAttribute("data-ro"));
    const newmv = parseFloat(selectedOptionElement.getAttribute("data-mv"));
    const selectedOptionText = selectedOptionElement.text; // Get the selected option's text

    setRd(newRd);
    setRo(newRo);
    setMvs(newmv);
    setSelectedOption6({ value: event.target.value, text: selectedOptionText }); // Set the selected SFRS option object
  };

  // Function to handle the input change for the first question
  const handleInputChange1 = (event) => {
    const newValue = event.target.value;
    // Perform the validation check
    if (!isNaN(newValue) && parseFloat(newValue) > 0) {
      setUserInput1(newValue);
    } else if (newValue === "") {
      setUserInput1(""); // Clear the input if it becomes empty
    }
  };

  // Function to handle the input change for the second question

  const handleInputChange2 = (event) => {
    const newValue = event.target.value;
    // Perform the validation check
    if (!isNaN(newValue) && parseFloat(newValue) > 0) {
      setUserInput2(newValue);
    } else if (newValue === "") {
      setUserInput2(""); // Clear the input if it becomes empty
    }
  };

  // Function to handle the input change for the third question
  const handleInputChange3 = (event) => {
    const value = event.target.value;
    const parsedValue = parseInt(value, 10);

    // Allow empty input (clearing the field)
    if (value === "") {
      setUserInput3("");
      setNumStoreys(0);
      setStoreysData([]);
    } else if (!isNaN(parsedValue) && parsedValue > 0 && parsedValue <= 20) {
      setUserInput3(value);
      setNumStoreys(parsedValue);
      setStoreysData(
        Array(parsedValue)
          .fill()
          .map(() => ({ weight: "", height: "" }))
      );
    }
  };

  const handleStoreyInputChange = (index, field, value) => {
    const newStoreysData = [...storeysData];
    newStoreysData[index] = {
      ...newStoreysData[index],
      [field]: value,
    };
    setStoreysData(newStoreysData);
  };

  // Function to handle the combined submit
  const handleSubmitCalculation = () => {
    // Ensure all options and inputs are selected/entered
    if (
      !selectedOption ||
      !selectedOption2 ||
      !selectedOption3 ||
      !selectedOption4 ||
      !selectedOption5 ||
      !selectedOption6 ||
      !userInput1 ||
      !userInput2 ||
      !userInput3
    ) {
      alert("Please select all options and enter all values.");
      return;
    }

    // Prepare the data to send to the backend
    const requestData = {
      latitude: parseFloat(
        document
          .querySelector(`option[value="${selectedOption}"]`)
          .getAttribute("data-lat")
      ),
      longitude: parseFloat(
        document
          .querySelector(`option[value="${selectedOption}"]`)
          .getAttribute("data-long")
      ),
      site_class: selectedOption2,
      Ie: parseFloat(selectedOption3),
      system: selectedOption4.value,
      material: selectedOption5.value,
      weight: parseFloat(userInput2),
      height: parseFloat(userInput1),
      n: parseInt(userInput3),
      rd: rd,
      ro: ro,
      mvs: mvs,
      storeys: storeysData,
    };

    console.log("Data to send to backend:", requestData); // Add this console log to check the data being sent

    // Make a POST request to your backend server
    fetch("https://structuralbc-cea735a41380.herokuapp.com/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the API response data here

        setCalculatedValues(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Function to handle the combined calculation submit

  return (
    <div className="main">
      <div className="Ie">
        <h2>Location</h2>

        <select
          className="btn"
          value={selectedOption}
          onChange={handleOptionChange}>
          <option value="">Select an option</option>
          <option data-lat="51.547795" data-long="-121.365459" value="1">
            100 Mile House
          </option>
          <option data-lat="49.052116" data-long="-122.329479" value="2">
            Abbotsford
          </option>
          <option data-lat="49.233333" data-long="-121.766667" value="3">
            Agassiz
          </option>
          <option data-lat="54.755" data-long="-124.766" value="4">
            Alberni
          </option>
          <option data-lat="50.721241" data-long="-121.283544" value="5">
            Ashcroft
          </option>
          <option data-lat="48.833086" data-long="-125.141144" value="6">
            Bamfield
          </option>
          <option data-lat="57.098931" data-long="-121.505866" value="7">
            Beatton River
          </option>
          <option data-lat="52.162562" data-long="-128.145208" value="8">
            Bella Bella
          </option>
          <option data-lat="52.371407" data-long="-126.753387" value="9">
            Bella Coola
          </option>
          <option data-lat="54.230269" data-long="-125.764503" value="10">
            Burns Lake
          </option>
          <option data-lat="50.813174" data-long="-121.324211" value="11">
            Cache Creek
          </option>
          <option data-lat="50.023071" data-long="-125.244154" value="12">
            Campbell River
          </option>
          <option data-lat="49.494745" data-long="-119.124229" value="13">
            Carmi
          </option>
          <option data-lat="49.316171" data-long="-117.663574" value="14">
            Castlegar
          </option>
          <option data-lat="55.695893" data-long="-121.638179" value="15">
            Chetwynd
          </option>
          <option data-lat="49.157677" data-long="-121.951431" value="16">
            Chilliwack
          </option>
          <option data-lat="49.672758" data-long="-124.92762" value="17">
            Comox
          </option>
          <option data-lat="49.689406" data-long="-124.995496" value="18">
            Courtenay
          </option>
          <option data-lat="49.510748" data-long="-115.767277" value="19">
            Cranbrook
          </option>
          <option data-lat="49.44665" data-long="-117.55738" value="20">
            Crescent Valley
          </option>
          <option data-lat="48.860025" data-long="-123.636581" value="21">
            Crofton
          </option>
          <option data-lat="55.760531" data-long="-120.236445" value="22">
            Dawson Creek
          </option>
          <option data-lat="58.437835" data-long="-129.995498" value="23">
            Dease Lake
          </option>
          <option data-lat="51.583333" data-long="-122.25" value="24">
            Dog Creek
          </option>
          <option data-lat="48.778687" data-long="-123.708045" value="25">
            Duncan
          </option>
          <option data-lat="49.300004" data-long="-115.116671" value="26">
            Elko
          </option>
          <option data-lat="49.504175" data-long="-115.062867" value="27">
            Fernie
          </option>
          <option data-lat="58.806285" data-long="-122.693959" value="28">
            Fort Nelson
          </option>
          <option data-lat="56.25239865" data-long="-120.8469486" value="29">
            Fort St. John
          </option>
          <option data-lat="54.755" data-long="-124.766" value="30">
            Glacier
          </option>
          <option data-lat="51.29759" data-long="-116.964654" value="31">
            Golden
          </option>
          <option data-lat="49.780758" data-long="-126.047409" value="32">
            Gold River
          </option>
          <option data-lat="49.027175" data-long="-118.456851" value="33">
            Grand Forks
          </option>
          <option data-lat="49.089585" data-long="-118.676876" value="34">
            Greenwood
          </option>
          <option data-lat="49.379944" data-long="-121.441352" value="35">
            Hope
          </option>
          <option data-lat="48.42269199" data-long="-124.0571416" value="36">
            Jordan River
          </option>
          <option data-lat="50.671779" data-long="-120.329395" value="37">
            Kamloops
          </option>
          <option data-lat="49.910616" data-long="-116.904984" value="38">
            Kaslo
          </option>
          <option data-lat="49.889326" data-long="-119.498291" value="39">
            Kelowna
          </option>
          <option data-lat="49.685088" data-long="-115.981948" value="40">
            Kimberley
          </option>
          <option data-lat="54.053558" data-long="-128.654052" value="41">
            Kitimat Plant
          </option>
          <option data-lat="54.053558" data-long="-128.654052" value="42">
            Kitimat Townsite
          </option>
          <option data-lat="48.993735" data-long="-123.815918" value="43">
            Ladysmith
          </option>
          <option data-lat="48.449769" data-long="-123.504666" value="44">
            Langford
          </option>
          <option data-lat="50.691224" data-long="-121.939827" value="45">
            Lillooet
          </option>
          <option data-lat="50.231132" data-long="-121.581601" value="46">
            Lytton
          </option>
          <option data-lat="55.324397" data-long="-123.09261" value="47">
            Mackenzie
          </option>
          <option data-lat="54.012447" data-long="-132.145224" value="48">
            Masset
          </option>
          <option data-lat="53.304196" data-long="-120.16407" value="49">
            McBride
          </option>
          <option data-lat="54.989441" data-long="-123.033443" value="50">
            McLeod Lake
          </option>
          <option data-lat="50.111704" data-long="-120.788423" value="51">
            Merritt
          </option>
          <option data-lat="49.158935" data-long="-122.283583" value="52">
            Mission City
          </option>
          <option data-lat="49.07841" data-long="-117.592862" value="53">
            Montrose
          </option>
          <option data-lat="50.239611" data-long="-117.797403" value="54">
            Nakusp
          </option>
          <option data-lat="49.163759" data-long="-123.937972" value="55">
            Nanaimo
          </option>
          <option data-lat="49.494891" data-long="-117.290039" value="56">
            Nelson
          </option>
          <option data-lat="52.350441" data-long="-127.689972" value="57">
            Ocean Falls
          </option>
          <option data-lat="49.033333" data-long="-119.466667" value="58">
            Osoyoos
          </option>
          <option data-lat="49.317951" data-long="-124.31174" value="59">
            Parksville
          </option>
          <option data-lat="49.494891" data-long="-119.594421" value="60">
            Penticton
          </option>
          <option data-lat="49.234367" data-long="-124.805652" value="61">
            Port Alberni
          </option>
          <option data-lat="54.755" data-long="-124.766" value="62">
            Port Alice
          </option>
          <option data-lat="50.72444" data-long="-127.497608" value="63">
            Port Hardy
          </option>
          <option data-lat="50.589345" data-long="-127.083903" value="64">
            Port McNeill
          </option>
          <option data-lat="48.550251" data-long="-124.417419" value="65">
            Port Renfrew
          </option>
          <option data-lat="49.835676" data-long="-124.524412" value="66">
            Powell River
          </option>
          <option data-lat="53.912865" data-long="-122.74537" value="67">
            Prince George
          </option>
          <option data-lat="54.312657" data-long="-130.32549" value="68">
            Prince Rupert
          </option>
          <option data-lat="49.460459" data-long="-120.507973" value="69">
            Princeton
          </option>
          <option data-lat="49.347986" data-long="-124.443941" value="70">
            Qualicum Beach
          </option>
          <option data-lat="53.254521" data-long="-132.102405" value="71">
            Queen Charlotte City
          </option>
          <option data-lat="52.979428" data-long="-122.493627" value="72">
            Quesnel
          </option>
          <option data-lat="50.998045" data-long="-118.195671" value="73">
            Revelstoke
          </option>
          <option data-lat="50.700506" data-long="-119.279053" value="74">
            Salmon Arm
          </option>
          <option data-lat="53.243586" data-long="-131.827997" value="75">
            Sandspit
          </option>
          <option data-lat="49.472115" data-long="-123.763124" value="76">
            Sechelt
          </option>
          <option data-lat="48.650579" data-long="-123.398325" value="77">
            Sidney
          </option>
          <option data-lat="54.779207" data-long="-127.176099" value="78">
            Smithers
          </option>
          <option data-lat="59.96883172" data-long="-126.4340858" value="79">
            Smith River
          </option>
          <option data-lat="48.382706" data-long="-123.732147" value="80">
            Sooke
          </option>
          <option data-lat="49.698074" data-long="-123.155861" value="81">
            Squamish
          </option>
          <option data-lat="55.938309" data-long="-129.991176" value="82">
            Stewart
          </option>
          <option data-lat="49.914093" data-long="-126.66275" value="83">
            Tahsis
          </option>
          <option data-lat="56.159227" data-long="-120.686769" value="84">
            Taylor
          </option>
          <option data-lat="54.517272" data-long="-128.599548" value="85">
            Terrace
          </option>
          <option data-lat="49.152964" data-long="-125.904708" value="86">
            Tofino
          </option>
          <option data-lat="49.099049" data-long="-117.713013" value="87">
            Trail
          </option>
          <option data-lat="48.942682" data-long="-125.54605" value="88">
            Ucluelet
          </option>
          <option
            data-lat="49.265334994524"
            data-long="-122.94391455447"
            value="89">
            Vancouver Region - Burnaby (Simon Fraser Univ.)
          </option>
          <option
            data-lat="49.111492417373"
            data-long="-122.73559725115"
            value="90">
            Vancouver Region - Cloverdale
          </option>
          <option
            data-lat="49.217206364674"
            data-long="-122.59666348478"
            value="91">
            Vancouver Region - Haney
          </option>
          <option
            data-lat="49.089990089633"
            data-long="-123.08177439608"
            value="92">
            Vancouver Region - Ladner
          </option>
          <option
            data-lat="49.104068380521"
            data-long="-122.66043579604"
            value="93">
            Vancouver Region - Langley
          </option>
          <option
            data-lat="49.206206217272"
            data-long="-122.91091115609"
            value="94">
            Vancouver Region - New Westminster
          </option>
          <option
            data-lat="49.319464568187"
            data-long="-123.07207359458"
            value="95">
            Vancouver Region - North Vancouver
          </option>
          <option
            data-lat="49.166973160712"
            data-long="-123.13512754117"
            value="96">
            Vancouver Region - Richmond
          </option>
          <option
            data-lat="49.162721283688"
            data-long="-122.7899545872"
            value="97">
            Vancouver Region - Surrey (88 Ave &amp; 156 St.)
          </option>
          <option
            data-lat="49.260937342143"
            data-long="-123.11333955479"
            value="98">
            Vancouver Region - Vancouver (City Hall)
          </option>
          <option
            data-lat="49.234319062867"
            data-long="-123.13965975766"
            value="99">
            Vancouver Region - Vancouver (Granville St. &amp; 41st Ave)
          </option>
          <option
            data-lat="49.329634362956"
            data-long="-123.16100043019"
            value="100">
            Vancouver Region - West Vancouver
          </option>
          <option data-lat="50.268277" data-long="-119.267578" value="101">
            Vernon
          </option>
          <option
            data-lat="48.415553177063"
            data-long="-123.33038797528"
            value="102">
            Victoria Region - Victoria
          </option>
          <option
            data-lat="48.456781879371"
            data-long="-123.32575093672"
            value="103">
            Victoria Region - Victoria (Gonzales Hts)
          </option>
          <option
            data-lat="48.428686448198"
            data-long="-123.36453326591"
            value="104">
            Victoria Region - Victoria (Mt Tolmie)
          </option>
          <option data-lat="50.085539" data-long="-123.030066" value="105">
            Whistler
          </option>
          <option data-lat="49.024167" data-long="-122.800842" value="106">
            White Rock
          </option>
          <option data-lat="52.129081" data-long="-122.139735" value="107">
            Williams Lake
          </option>
          <option data-lat="48.872845" data-long="-124.194946" value="108">
            Youbou
          </option>
        </select>

        <h2>Site Class</h2>
        <select
          className="btn"
          value={selectedOption2}
          onChange={handleOptionChange2}>
          <option value="">Select an option</option>
          <option value="A">A (Hard rock)</option>
          <option value="B">B (Rock)</option>
          <option value="C">C (Dense soil & soft rock)</option>
          <option value="D">D (Stiff soil)</option>
          <option value="E">E (Soft soil)</option>
          {/* Add more options as needed */}
        </select>

        <h2>
          Earthquake Importance Factor (I<sub>E</sub>)
        </h2>

        <select
          className="btn"
          value={selectedOption3}
          onChange={handleOptionChange3}>
          <option value="">Select an option</option>
          <option value="0.8">Low</option>
          <option value="1.0">Normal</option>
          <option value="1.3">High</option>
          <option value="1.5">Post-Disaster</option>
          {/* Add more options as needed */}
        </select>

        {/* Second question - Dropdown */}
        <h2>System</h2>
        <select
          className="btn"
          value={selectedOption4.value}
          onChange={handleOptionChange4}>
          <option value="">Select an option</option>
          <option value="1">Moment Frame</option>
          <option value="2">Braced Frame</option>
          <option value="3">Shear Wall</option>
          <option value="4">Other structures</option>

          {/* Add more options as needed */}
        </select>

        <h2>Material</h2>
        <select
          className="btn"
          value={selectedOption5.value}
          onChange={handleOptionChange5}>
          <option value="">Select an option</option>
          <option value="1">Steel</option>
          <option value="2">Concrete</option>
          <option value="3">Timber</option>
          <option value="4">Masonry</option>
          <option value="5">Cold-Formed Steel</option>
          {/* Add more options as needed */}
        </select>

        {/* Third question */}
        <h2>Weight(kN)</h2>

        <input
          className="btn"
          type="text"
          placeholder="Enter a value"
          value={userInput2}
          onChange={handleInputChange2}
        />

        <h2>Height(m)</h2>

        <input
          className="btn"
          type="text"
          placeholder="Enter a value"
          value={userInput1}
          onChange={handleInputChange1}
        />

        <div>
          <h2>SFRS</h2>
          <select
            className="btn"
            value={selectedOption6.value}
            onChange={handleOptionChange6}>
            <option value="">Select an option</option>

            {selectedOption5.value === "1" && (
              <>
                {selectedOption4.value === "1" && (
                  <>
                    <option data-rd="5" data-ro="1.5" data-mv="1" value="1">
                      Ductile moment-resisting frames
                    </option>
                    <option data-rd="3.5" data-ro="1.5" data-mv="1" value="2">
                      Moderately ductile moment-resisting frames
                    </option>
                    <option data-rd="2" data-ro="1.3" data-mv="1" value="3">
                      Limited ductility moment-resisting frames
                    </option>
                    <option data-rd="3.5" data-ro="1.6" data-mv="1" value="4">
                      Moderately ductile truss moment-resisting frames
                    </option>
                    <option data-rd="1.5" data-ro="1.3" data-mv="1" value="5">
                      Conventional construction of moment-resisting frames,
                      braced frames or plate walls
                    </option>
                    <option data-rd="1" data-ro="1" data-mv="5" value="6">
                      Other steel SFRSs not defined above
                    </option>
                  </>
                )}

                {selectedOption4.value === "2" && (
                  <>
                    <option data-rd="3" data-ro="1.3" data-mv="3" value="1">
                      Moderately ductile concentrically braced frames
                    </option>
                    <option data-rd="2" data-ro="1.3" data-mv="3" value="2">
                      Limited ductility concentrically braced frames
                    </option>
                    <option data-rd="4" data-ro="1.2" data-mv="3" value="3">
                      Ductile buckling-restrained braced frames
                    </option>
                    <option data-rd="4" data-ro="1.5" data-mv="3" value="4">
                      Ductile eccentrically braced frames
                    </option>
                    <option data-rd="1.5" data-ro="1.3" data-mv="3" value="5">
                      Conventional construction of moment-resisting frames,
                      braced frames or plate walls
                    </option>
                    <option data-rd="1" data-ro="1" data-mv="5" value="6">
                      Other steel SFRSs not defined above
                    </option>
                  </>
                )}

                {selectedOption4.value === "3" && (
                  <>
                    <option data-rd="5" data-ro="1.6" data-mv="4" value="1">
                      Ductile plate walls
                    </option>
                    <option data-rd="3.5" data-ro="1.3" data-mv="4" value="2">
                      Moderately ductile plate walls
                    </option>
                    <option data-rd="2" data-ro="1.3" data-mv="4" value="3">
                      Limited ductility plate walls
                    </option>
                    <option data-rd="1.5" data-ro="1.3" data-mv="4" value="4">
                      Conventional construction of moment-resisting frames,
                      braced frames or plate walls
                    </option>
                    <option data-rd="1" data-ro="1" data-mv="5" value="5">
                      Other steel SFRSs not defined above
                    </option>
                  </>
                )}
              </>
            )}

            {selectedOption5.value === "2" && (
              <>
                {selectedOption4.value === "1" && (
                  <>
                    <option data-rd="4" data-ro="1.7" data-mv="1" value="1">
                      Ductile moment-resisting frames
                    </option>
                    <option data-rd="2.5" data-ro="1.4" data-mv="1" value="2">
                      Moderately ductile moment-resisting frames
                    </option>
                    <option data-rd="1.5" data-ro="1.3" data-mv="1" value="3">
                      Conventional construction (Moment-resisting frames, Shear
                      walls, Two way slabs without beams)
                    </option>
                    <option data-rd="1" data-ro="1" data-mv="5" value="4">
                      Other concrete SFRSs not listed above
                    </option>
                  </>
                )}

                {selectedOption4.value === "3" && (
                  <>
                    <option data-rd="4" data-ro="1.7" data-mv="2" value="1">
                      Ductile coupled walls
                    </option>
                    <option data-rd="2.5" data-ro="1.4" data-mv="2" value="2">
                      Moderately ductile coupled walls
                    </option>
                    <option data-rd="3.5" data-ro="1.7" data-mv="2" value="3">
                      Ductile partially coupled walls
                    </option>
                    <option data-rd="2" data-ro="1.4" data-mv="2" value="4">
                      Moderately ductile partially coupled walls
                    </option>
                    <option data-rd="3.5" data-ro="1.6" data-mv="4" value="5">
                      Ductile shear walls
                    </option>
                    <option data-rd="2" data-ro="1.4" data-mv="4" value="6">
                      Moderately ductile shear walls
                    </option>
                    <option data-rd="1.5" data-ro="1.3" data-mv="4" value="7">
                      Conventional construction (Moment-resisting frames, Shear
                      walls, Two way slabs without beams)
                    </option>
                    <option data-rd="2" data-ro="1.3" data-mv="4" value="8">
                      Tilt up construction (Moderately ductile walls and frames)
                    </option>
                    <option data-rd="1.5" data-ro="1.3" data-mv="4" value="9">
                      Tilt up construction (Limited ductility walls and frames)
                    </option>
                    <option data-rd="1.3" data-ro="1.3" data-mv="4" value="10">
                      Tilt up construction (Conventional walls and frames)
                    </option>
                    <option data-rd="1" data-ro="1" data-mv="4" value="11">
                      Other concrete SFRSs not listed above
                    </option>
                  </>
                )}
              </>
            )}

            {selectedOption5.value === "3" && (
              <>
                {selectedOption4.value === "1" && (
                  <>
                    <option data-rd="2" data-ro="1.5" data-mv="4" value="1">
                      Braced or moment-resisting frames with ductile connections
                      (Moderately ductile)
                    </option>
                    <option data-rd="1.5" data-ro="1.5" data-mv="4" value="2">
                      Braced or moment-resisting frames with ductile connections
                      (Limited ductility)
                    </option>
                  </>
                )}

                {selectedOption4.value === "2" && (
                  <>
                    <option data-rd="2" data-ro="1.5" data-mv="4" value="1">
                      Braced or moment-resisting frames with ductile connections
                      (Moderately ductile)
                    </option>
                    <option data-rd="1.5" data-ro="1.5" data-mv="4" value="2">
                      Braced or moment-resisting frames with ductile connections
                      (Limited ductility)
                    </option>
                  </>
                )}

                {selectedOption4.value === "3" && (
                  <>
                    <option data-rd="3" data-ro="1.7" data-mv="4" value="1">
                      Shear walls(Nailed shear walls:wood-based panel)
                    </option>
                    <option data-rd="3" data-ro="1.7" data-mv="4" value="2">
                      Shear walls(wood-based and gypsum panels in combination)
                    </option>
                    <option data-rd="2" data-ro="1.5" data-mv="4" value="3">
                      Moderately ductile cross-laminated timber shear walls:
                      platform-type construction
                    </option>
                    <option data-rd="1" data-ro="1.3" data-mv="4" value="4">
                      Limited ductility cross-laminated timber shear walls:
                      platform-type construction
                    </option>
                    <option data-rd="1" data-ro="1" data-mv="5" value="5">
                      Other wood- or gypsum-based SFRSs not listed above
                    </option>
                  </>
                )}
              </>
            )}

            {selectedOption5.value === "4" && (
              <>
                {selectedOption4.value === "1" && (
                  <>
                    <option data-rd="2" data-ro="1.5" data-mv="4" value="1">
                      Conventional construction (Shear walls, Moment-resisting
                      frames)
                    </option>
                  </>
                )}

                {selectedOption4.value === "3" && (
                  <>
                    <option data-rd="3" data-ro="1.5" data-mv="4" value="1">
                      Ductile shear walls
                    </option>
                    <option data-rd="2" data-ro="1.5" data-mv="4" value="2">
                      Moderately ductile shear walls
                    </option>
                  </>
                )}

                <option data-rd="1" data-ro="1" data-mv="5" value="4">
                  Unreinforced masonry
                </option>
                <option data-rd="1" data-ro="1" data-mv="5" value="5">
                  Other masonry SFRSs not listed above
                </option>
              </>
            )}

            {selectedOption5.value === "5" && (
              <>
                {selectedOption4.value === "3" && (
                  <>
                    <option data-rd="2.5" data-ro="1.7" data-mv="4" value="1">
                      Shear walls (Screw-connected shear walls – wood-based
                      panels)
                    </option>
                    <option data-rd="1.5" data-ro="1.7" data-mv="4" value="2">
                      Shear walls (Screw-connected shear walls – wood-based and
                      gypsum panels in combination)
                    </option>
                    <option data-rd="1.9" data-ro="1.3" data-mv="3" value="3">
                      Diagonal strap concentrically braced walls (Limited
                      ductility)
                    </option>
                    <option data-rd="1.2" data-ro="1.3" data-mv="3" value="4">
                      Diagonal strap concentrically braced walls (Conventional
                      construction)
                    </option>
                    <option data-rd="1" data-ro="1" data-mv="5" value="5">
                      Other cold-formed SFRSs not defined above
                    </option>
                  </>
                )}
              </>
            )}
          </select>

          <h2>Total Number of Storeys</h2>

          <input
            className="btn"
            type="text"
            placeholder="Enter a value"
            value={userInput3}
            onChange={handleInputChange3}
          />
        </div>
        {numStoreys > 0 && (
          <div>
            {storeysData.map((storey, index) => (
              <div key={index}>
                <h2>Story {index + 1}</h2>
                <div>
                  <input
                    type="text"
                    className="btn"
                    placeholder={`Weight of Story ${index + 1} (kN)`}
                    value={storeysData[index].weight}
                    onChange={(event) =>
                      handleStoreyInputChange(
                        index,
                        "weight",
                        event.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="btn"
                    placeholder={`Height of Story ${index + 1} (m)`}
                    value={storeysData[index].height}
                    onChange={(event) =>
                      handleStoreyInputChange(
                        index,
                        "height",
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="btn2" onClick={handleSubmitCalculation}>
          Calculate
        </button>
      </div>

      <div>
        <div className="pdfsave">
          <button className="save-pdf-button" onClick={handleSaveAsPDF}>
            Save as PDF
          </button>
        </div>

        <div className="values">
          {calculatedValues && (
            <>
              <h2>Location</h2>

              <div className="seismic">
                <p>{getSelectedCityText()}, British Columbia</p>

                <p>Latitude: {calculatedValues.latitude}</p>

                <p>Longitude: {calculatedValues.longitude}</p>
              </div>

              <h2>Seismic Values</h2>

              <div className="seismic">
                <p>Probability of exceedance in 50 years = 2%</p>

                <p>Site Class: {calculatedValues.site_class}</p>
              </div>

              <div className="seismic">
                <div>
                  <p>Sa(0.2) = {calculatedValues.sa02}</p>
                  <p>Sa(0.5) = {calculatedValues.sa05}</p>
                  <p>Sa(1.0) = {calculatedValues.sa1}</p>
                </div>

                <div>
                  <p>Sa(2.0) = {calculatedValues.sa2}</p>
                  <p>Sa(5.0) = {calculatedValues.sa5}</p>
                  <p>Sa(10.0) = {calculatedValues.sa10}</p>
                </div>
              </div>

              <h2>Input Values</h2>

              <p>Importance Factor, Ie = {calculatedValues.Ie}</p>

              <div className="seismic">
                <p>Selected System: {selectedOption4.text}</p>

                <p>Selected Material: {selectedOption5.text}</p>
              </div>

              <div className="seismic">
                <p>Weight, W = {calculatedValues.w} kN</p>

                <p>
                  Height, h<sub>n</sub> = {calculatedValues.hn} m
                </p>

                <p>N = {calculatedValues.n}</p>
              </div>

              <p>SFRS: {selectedOption6.text}</p>

              <h2>Calculated Values</h2>

              <div className="seismic">
                <p>ta = {calculatedValues.ta}s</p>

                <p>
                  sa({calculatedValues.ta}) = {calculatedValues.sata}
                </p>

                <p>
                  R<sub>d</sub> = {calculatedValues.Rd}
                </p>

                <p>
                  R<sub>o</sub> = {calculatedValues.Ro}
                </p>

                <p>mv = {calculatedValues.mv}</p>
              </div>

              <p>
                V = S(T<sub>a</sub>)M<sub>v</sub>I<sub>E</sub>W/(R<sub>d</sub>R
                <sub>o</sub>) = {calculatedValues.v} kN
              </p>

              {calculatedValues.count === 1 && (
                <>
                  <p>
                    V<sub>min</sub> = S(4.0)M<sub>v</sub>I<sub>E</sub>W/(R
                    <sub>d</sub>R<sub>o</sub>) = {calculatedValues.vmin}kN
                  </p>
                </>
              )}

              {calculatedValues.count === 2 && (
                <>
                  <p>
                    V<sub>min</sub> = S(2.0)M<sub>v</sub>I<sub>E</sub>W/(R
                    <sub>d</sub>R<sub>o</sub>) = {calculatedValues.vmin} kN
                  </p>
                </>
              )}

              <p>
                V<sub>max</sub> = MAX (2/3)S(0.2)I<sub>E</sub>W/(R<sub>d</sub>R
                <sub>o</sub>) or S(0.5)I<sub>E</sub>W/(R<sub>d</sub>R
                <sub>o</sub>) = {calculatedValues.vmax} kN
              </p>

              {calculatedValues.check === 1 && (
                <>
                  <p>
                    V &gt; V<sub>max</sub> and R<sub>d</sub> ≥ 1.5
                  </p>

                  <h2>
                    V<sub>design</sub> = {calculatedValues.vmax} kN
                  </h2>
                </>
              )}

              {calculatedValues.check === 2 && (
                <>
                  <p>
                    V<sub>min</sub> &gt; V &gt; V<sub>max</sub>{" "}
                  </p>

                  <h2>
                    V<sub>design</sub> = {calculatedValues.v} kN
                  </h2>
                </>
              )}

              {calculatedValues.check === 3 && (
                <>
                  <p>
                    V &gt; V<sub>min</sub> but R<sub>d</sub> &lt; 1.5{" "}
                  </p>

                  <h2>
                    V<sub>design</sub> = {calculatedValues.v} kN
                  </h2>
                </>
              )}

              <div>
                {(() => {
                  const elements = [];
                  let index = 0;
                  for (const storey of calculatedValues.storeys) {
                    elements.push(
                      <div key={index}>
                        <h2>Story {index + 1}</h2>
                        <p>Weight: {storey.weight} kN</p>
                        <p>Height: {storey.height} m</p>
                        <p>
                          F<sub>x</sub> = {storey.fx} kN
                        </p>
                      </div>
                    );
                    index++;
                  }
                  return elements;
                })()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CombinedQuestions;
