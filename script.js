function goTo(id) {
  ['landing','gfx','uiux'].forEach(p => {
    const el = document.getElementById(p);

    el.style.display =
      el.id === id
        ? (id === 'landing' ? 'flex' : 'block')
        : 'none';
  });
}


function toggleCustom() {

  const designType =
    document.getElementById('gDesignType').value;

  document
    .getElementById('gCustomWrap')
    .classList.toggle(
      'hidden',
      designType !== 'Others'
    );
}


function fileChosen(id, input) {

  if (!input.files[0]) return;

  const box = document.getElementById(id);

  box.querySelector('.ulbl').textContent =
    input.files[0].name;

  box.style.borderColor = '#2563eb';
  box.style.background = '#eff6ff';
}



/* =========================================
   GRAPHIC DESIGN UPLOAD
========================================= */

document
  .getElementById('gUploadBtn')
  .addEventListener('click', async () => {

    try {

      const title =
        document.getElementById('gTitle').value;

      const description =
        document.getElementById('gDescription').value;

      let designType =
        document.getElementById('gDesignType').value;

      const customType =
        document.getElementById('gCustomDesignType').value;

      const tools =
        document.getElementById('gTools').value;

      const link =
        document.getElementById('gLink').value;

      const imageFile =
        document.getElementById('gThumbnail').files[0];


      if (!title || !designType || !tools || !imageFile) {
        alert('Please complete all required fields.');
        return;
      }


      if (designType === 'Others') {

        if (!customType) {
          alert('Please enter custom design type.');
          return;
        }

        designType = customType;
      }


      /* Upload image */

      const imageName =
        `${Date.now()}-${imageFile.name}`;


      const { error: uploadError } =
        await supabaseClient.storage
          .from('portfolio')
          .upload(
            `graphic-designs/${imageName}`,
            imageFile
          );


      if (uploadError) {
        alert(uploadError.message);
        return;
      }


      /* Get public URL */

      const { data: imageData } =
        supabaseClient.storage
          .from('portfolio')
          .getPublicUrl(
            `graphic-designs/${imageName}`
          );


      const imageUrl =
        imageData.publicUrl;


      /* Insert database */

      const { error } =
        await supabaseClient
          .from('graphic_designs')
          .insert([
            {
              title: title,
              description: description,
              design_type: designType,
              tools_used: tools,
              image_url: imageUrl,
              project_link: link
            }
          ]);


      if (error) {
        alert(error.message);
        return;
      }


      alert('Graphic design uploaded successfully!');

    } catch (err) {

      console.error(err);
      alert('Something went wrong.');

    }

  });



/* =========================================
   UI UX UPLOAD
========================================= */

document
  .getElementById('uUploadBtn')
  .addEventListener('click', async () => {

    try {

      const title =
        document.getElementById('uTitle').value;

      const description =
        document.getElementById('uDescription').value;

      const platform =
        document.getElementById('uPlatform').value;

      const tools =
        document.getElementById('uTools').value;

      const figmaLink =
        document.getElementById('uFigmaLink').value;

      const imageFile =
        document.getElementById('uCover').files[0];

      const videoFile =
        document.getElementById('uVideo').files[0];


      if (!title || !platform || !tools || !imageFile) {
        alert('Please complete required fields.');
        return;
      }


      /* Upload image */

      const imageName =
        `${Date.now()}-${imageFile.name}`;


      const { error: imageError } =
        await supabaseClient.storage
          .from('portfolio')
          .upload(
            `uiux-images/${imageName}`,
            imageFile
          );


      if (imageError) {
        alert(imageError.message);
        return;
      }


      const { data: imageData } =
        supabaseClient.storage
          .from('portfolio')
          .getPublicUrl(
            `uiux-images/${imageName}`
          );


      const imageUrl =
        imageData.publicUrl;


      /* Optional video */

      let videoUrl = null;


      if (videoFile) {

        const videoName =
          `${Date.now()}-${videoFile.name}`;


        const { error: videoError } =
          await supabaseClient.storage
            .from('portfolio')
            .upload(
              `uiux-videos/${videoName}`,
              videoFile
            );


        if (videoError) {
          alert(videoError.message);
          return;
        }


        const { data: videoData } =
          supabaseClient.storage
            .from('portfolio')
            .getPublicUrl(
              `uiux-videos/${videoName}`
            );


        videoUrl =
          videoData.publicUrl;
      }


      /* Insert database */

      const { error } =
        await supabaseClient
          .from('uiux_projects')
          .insert([
            {
              title: title,
              description: description,
              platform: platform,
              tools_used: tools,
              image_url: imageUrl,
              video_url: videoUrl,
              figma_prototype_link: figmaLink
            }
          ]);


      if (error) {
        alert(error.message);
        return;
      }


      alert('UI/UX project uploaded successfully!');

    } catch (err) {

      console.error(err);
      alert('Something went wrong.');

    }

  });
