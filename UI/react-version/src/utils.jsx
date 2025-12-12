export function listToJSX(lst) {
    return (
        <div>
            {lst.map((obj, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
                    {Object.entries(obj).map(([key, value]) => (
                        <p key={key}>
                            <strong>{key}:</strong> {String(value)}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}