import { supabase } from "../lib/supabase";

interface ActivityRow {
  id: string;
  title: string;
  subject: string;
  description?: string;
  html_content: string;
  correction_html?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

interface ActivityModel {
  id: string;
  title: string;
  subject: string;
  description: string;
  htmlContent: string;
  correction: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

interface CreateActivityParams {
  title: string;
  subject: string;
  description: string;
  htmlContent: string;
  correction?: string;
}

interface UpdateActivityParams {
  title?: string;
  subject?: string;
  description?: string;
  htmlContent?: string;
  correction?: string;
}

// Map DB row -> app model
const mapRow = (r: ActivityRow): ActivityModel => ({
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

export async function listActivities(): Promise<ActivityModel[]> {
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
}: CreateActivityParams): Promise<ActivityModel> {
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
  id: string,
  { title, subject, description, htmlContent, correction }: UpdateActivityParams
): Promise<ActivityModel> {
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

export async function deleteActivity(id: string): Promise<boolean> {
  const { error } = await supabase.from("activities").delete().eq("id", id);
  if (error) throw error;
  return true;
}
