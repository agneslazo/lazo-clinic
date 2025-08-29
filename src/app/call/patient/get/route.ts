import clientPromise from "../../../../../lib/mongodb";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("name") || "";

    try {
        const client = await clientPromise;
        const db = client.db("Medic"); // 👈 your DB name
        const collection = db.collection("Patient");

        const results = await collection.aggregate([
            {
                $search: {
                    index: "patient_search", // 👈 your search index name
                    autocomplete: {
                        query: query,            // e.g. "Al"
                        path: "name.first_name", // or ["name.first_name", "name.last_name"]
                        fuzzy: {
                            maxEdits: 2,
                            prefixLength: 1,
                        },
                    },
                },
            },
            { $limit: 10 } // limit results
        ]).toArray();


        return Response.json({ results });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Database query failed" }, { status: 500 });
    }
}
