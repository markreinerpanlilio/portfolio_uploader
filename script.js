const workType = document.getElementById("workType");


  // Optional video upload

  let videoUrl = null;

  const videoFile = document.getElementById("uVideo").files[0];


  if (videoFile) {

    const videoName = `${Date.now()}-${videoFile.name}`;

    const { error: videoError } = await supabaseClient.storage
      .from("portfolio")
      .upload(`uiux-videos/${videoName}`, videoFile);


    if (videoError) {
      alert(videoError.message);
      return;
    }


    const { data: videoData } = supabaseClient.storage
      .from("portfolio")
      .getPublicUrl(`uiux-videos/${videoName}`);


    videoUrl = videoData.publicUrl;

  }


  // Insert database

  const { error } = await supabaseClient
    .from("uiux_projects")
    .insert([
      {
        title: document.getElementById("uTitle").value,
        description: document.getElementById("uDescription").value,
        project_type: document.getElementById("uProjectType").value,
        platform: document.getElementById("uPlatform").value,
        tools_used: document.getElementById("uTools").value.split(","),
        tags: document.getElementById("uTags").value.split(","),
        screens_count: document.getElementById("uScreens").value,
        ux_problem: document.getElementById("uProblem").value,
        ux_solution: document.getElementById("uSolution").value,
        cover_image_url: imageUrl,
        demo_video_url: videoUrl,
        created_by: "Reiner Panlilio"
      }
    ]);


  if (error) {
    alert(error.message);
    return;
  }


  alert("UI/UX project uploaded successfully!");

  uiuxForm.reset();

});
