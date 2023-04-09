<template>
  <div class="container">
    <div class="resumeContainer">
      <div class="headerContainer">
        <h2 class="uploadHeader">Upload Your First Resume Here!</h2>
      </div>
      <div class="resumeDetails">
        <form id="resume_form">
          <label class="resumeLabels" for="title">Title </label> <br />
          <input
            class="resumeInput"
            type="text"
            name="title"
            placeholder="Type here"
          />
          <br />
          <label class="resumeLabels" for="role">Role </label> <br />
          <input
            class="resumeInput"
            type="text"
            name="role"
            placeholder="Type here"
          />
          <br />
          <label class="resumeLabels" for="location">Location </label> <br />
          <input
            class="resumeInput"
            type="text"
            name="location"
            placeholder="Type here"
          />
          <br />
          <label class="resumeLabels" for="experience">Experience Level </label>
          <br />
          <input
            class="resumeInput"
            type="text"
            name="experience"
            placeholder="Type here"
          />
          <br />
          <label class="resumeLabels" for="additionalInfo"
            >Additional Information
          </label>
          <br />
          <input
            class="resumeInput"
            type="text"
            name="additionalInfo"
            placeholder="Type here"
          />
          <br />
          <div class="pdfDropBox">
            <p class="dropPdfHeader">
              Drag & drop files or <span class="bolded"><u>Browse</u></span>
            </p>
            <p class="dropPdfHeader" id="supportedFileFormat">
              Supported file format: PDF only
            </p>
          </div>
          <div id="submitContainer">
            <button class="submitButton" @click="addDummyData">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { dummy_data } from "../data/ResumeData";
import { db } from '../firebase.js';
import { writeBatch, doc, collection, addDoc } from 'firebase/firestore';

export default {
  methods: {
    async addDummyData() {
      var dummy_data = [
        {
          user_id: '64247f9646a1c53b703f5f47',
          resume_id: 1,
          experience: '{{integer(0, 50)}',
          date: 'Sat Jan 20 1973 11:26:35 GMT+0730 (Singapore Standard Time)',
          name: 'Cleo Ray',
          title: 'Applying to MALATHION',
          about:
            'Ea excepteur quis irure et cupidatat nulla. Anim reprehenderit officia proident eu nostrud ad magna commodo. Irure deserunt eiusmod eu sunt pariatur labore.\r\n',
          location: 'United Arab Emirates',
        },
        {
          user_id: '64247f96c890a2ecc3657ee8',
          resume_id: 2,
          experience: '{{integer(0, 50)}',
          date: 'Thu Jun 16 1983 13:12:40 GMT+0800 (Singapore Standard Time)',
          name: 'Maria Vinson',
          title: 'Applying to EXOSWITCH',
          about:
            'Consequat irure quis enim laborum velit amet laboris deserunt ullamco. Amet excepteur officia qui occaecat non. Aute ea excepteur ea nulla sit mollit exercitation enim eiusmod exercitation labore aliqua. Ex laborum veniam non et irure labore amet velit culpa reprehenderit aute laborum aliquip aliqua. Ad eiusmod magna laboris est velit laborum aliqua consectetur. Irure culpa enim officia veniam duis. Sunt magna elit nulla amet.\r\n',
          location: 'Kazakhstan',
        },
        {
          user_id: '64247f9670ac2432ff780cf5',
          resume_id: 3,
          experience: '{{integer(0, 50)}',
          date: 'Wed Aug 15 2012 22:27:05 GMT+0800 (Singapore Standard Time)',
          name: 'Jayne Grant',
          title: 'Applying to SPORTAN',
          about:
            'Velit eiusmod ipsum sunt id nulla. Id id tempor in irure mollit sint adipisicing nostrud consequat eu commodo Lorem. Fugiat aute nulla id Lorem sunt. Cupidatat dolore anim elit consectetur aute ex amet veniam occaecat est sit eu. Dolor nulla dolore eiusmod aute consectetur incididunt pariatur. Ut pariatur voluptate eiusmod sint aliqua qui ea magna ipsum qui anim dolore. Amet enim dolore sint est officia culpa.\r\n',
          location: 'Hong Kong',
        },
        {
          user_id: '64247f96521ce02531404d85',
          resume_id: 4,
          experience: '{{integer(0, 50)}',
          date: 'Mon May 26 2008 22:50:05 GMT+0800 (Singapore Standard Time)',
          name: 'Stephenson Ortiz',
          title: 'Applying to PHUEL',
          about:
            'Mollit eiusmod ad elit sit sit veniam excepteur culpa incididunt. Nostrud eiusmod ullamco id culpa irure do nisi cillum ipsum. Occaecat ullamco reprehenderit ipsum quis id consequat deserunt culpa excepteur nisi id velit non nulla. Magna sint consequat eiusmod eu irure ut cupidatat sint ad esse cupidatat. Do ullamco cillum duis sunt adipisicing cillum nostrud. Ea quis occaecat ex adipisicing aliqua. Enim adipisicing incididunt adipisicing irure Lorem fugiat ea excepteur velit ex laboris.\r\n',
          location: 'Nigeria',
        },
        {
          user_id: '64247f969446dab25ab93485',
          resume_id: 5,
          experience: '{{integer(0, 50)}',
          date: 'Fri Apr 14 2006 14:00:23 GMT+0800 (Singapore Standard Time)',
          name: 'Charlene Hanson',
          title: 'Applying to PHOLIO',
          about:
            'Laboris veniam non nulla ipsum aliquip et tempor. Commodo laborum voluptate ad ut cupidatat amet mollit dolore Lorem voluptate. Irure est laborum laboris ut nostrud.\r\n',
          location: 'Libya',
        },
      ];
      dummy_data.forEach(async (data) => {
        const docRef = await addDoc(collection(db, 'dummyData'), { data });
        console.log('Document written with ID: ', docRef.id);
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow: scroll;
  /* background-color: #ededed; */
}
.resumeContainer {
  flex: 2;
  background-color: white;
  align-self: center;
  /* margin-left: 300px;
  margin-right: 200px; */
  height: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.headerContainer {
  align-content: center;
}

.uploadHeader {
  text-align: center;
  padding-top: 5%;
}

#backgroundImage {
  width: 90%;
  height: 90%;
}

.resumeDetails {
  padding: 20px;
  align-content: center;
  text-align: center;
  background-color: white;
  height: 100%;
}

.resumeInput {
  display: inline-block;
  text-align: left;
  width: 100%;
  display: flex;
  padding: 12px 20px;
  box-sizing: border-box;
  border-color: #b4b2b2;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

form {
  margin-left: 25%;
  text-align: left;
  align-items: center;
  background-color: white;
  width: 50%;
  height: 50%;
}

.pdfDropBox {
  background-color: lavender;
  width: 100%;
  text-align: center;
  border-radius: 0.5%;
  border-color: grey;
  border-style: dotted;
  padding: 20% 0;
  margin: auto;
}

.dropPdfHeader {
  text-align: center;
}

#supportedFileFormat {
  font-size: 80%;
  color: grey;
}

.bolded {
  font-weight: bold;
  color: darkslateblue;
}

.resumeLabel {
  font-size: small;
}

.submitButton {
  background-color: orange;
  border-color: orange;
  color: white;
  margin-top: 1%;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 5%;
  padding-right: 5%;
}

.submitButton:hover {
  background-color: darkorange;
  border-color: darkorange;
}

#submitContainer {
  text-align: center;
}
</style>
