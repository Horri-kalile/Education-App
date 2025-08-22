import { supabase } from "../lib/supabase";

// Map DB row -> app model
const mapRow = (r) => ({
  id: r.id,
  title: r.title,
  subject: r.subject,
  description: r.description || "",
  htmlContent: r.html_content,
  correction: r.correction_html || "",
  createdAt: r.created_at,
  updatedAt: r.updated_at,
  createdBy: r.created_by,
});

export async function listActivities() {
  const { data, error } = await supabase
    .from("activities")
    .select(
      "id,title,subject,description,html_content,correction_html,created_by,created_at,updated_at"
    )
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function createActivity({
  title,
  subject,
  description,
  htmlContent,
  correction,
}) {
  const { data, error } = await supabase
    .from("activities")
    .insert({
      title,
      subject,
      description,
      html_content: htmlContent,
      correction_html: correction || null,
    })
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
}

export async function updateActivity(
  id,
  { title, subject, description, htmlContent, correction }
) {
  const { data, error } = await supabase
    .from("activities")
    .update({
      title,
      subject,
      description,
      html_content: htmlContent,
      correction_html: correction || null,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
}

export async function deleteActivity(id) {
  const { error } = await supabase.from("activities").delete().eq("id", id);
  if (error) throw error;
  return true;
}
