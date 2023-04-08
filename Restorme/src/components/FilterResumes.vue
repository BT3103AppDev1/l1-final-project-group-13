<template>
    <div id = "FilterBarContainer">
        <h3>Filter:</h3>
        <br/>
        <div class="dropdown">
        <h5>Role</h5>
        <button class="btn btn-secondary dropdown-toggle" id="role-dropdown" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select Role
        </button>
        <ul class="dropdown-menu" aria-labelledby="role-dropdown">
            <li><a class="dropdown-item" href="#">Software Engineer</a></li>
            <li><a class="dropdown-item" href="#">Data Analyst</a></li>
            <li><a class="dropdown-item" href="#">Backend Engineer</a></li>
            <li><a class="dropdown-item" href="#">Data Scientist</a></li>
        </ul>
        </div>
        <br/>
        <br/>
        <div>
            <h5>Years of Experience</h5>
            <input id = "yearsOfExp" type = "number" placeholder="Years of Experience">
        </div>
        <br/>
        <br/>
        <div class="dropdown">
            <h5>Location</h5>
            <button class="btn btn-secondary dropdown-toggle" id="role-dropdown" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select Location
            </button>
            <ul class="dropdown-menu" aria-labelledby="role-dropdown">
                <li><a class="dropdown-item" href="#">Singapore</a></li>
                <li><a class="dropdown-item" href="#">United States</a></li>
                <li><a class="dropdown-item" href="#">China</a></li>
            </ul>
        </div>
        <br/>
        <br/>
        <input type = "checkbox" id = "reviewed" v-model = "checked" />
        <label for = "reviewed" class = "checkboxLabel">Reviewed</label>
        <br/>
        <input type = "checkbox" id = "unreviewed" v-model = "checked" />
        <label for = "unreviewed" class = "checkboxLabel">Unreviewed</label>
    </div>
</template>

<script>

export default {
    name: "FilterResumes",
}
</script>

<style>

#FilterBarContainer {
    border-style: solid;
    width: 15%;
    margin-left: 15%;
    padding-left: 1%;
    padding-right: 1%;
    padding-top: 1%;
    position: fixed;
    height: 100%;
}

.checkboxLabel {
    padding-left: 10px;
}

</style>