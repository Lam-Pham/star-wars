import React from 'react'

interface SearchProps {
    handleSubmit: (event: { preventDefault: () => void }) => void
    handleChange: (event: { target: { value: React.SetStateAction<string> } }) => void
    search: string
}

function Search ({
    handleSubmit,
    handleChange,
    search
}: SearchProps) {
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="search any character!"
                value={search}
                onChange={handleChange}
                name="Search"
            />
            <input type="submit" value="Search"/>
        </form>
    )
}

export default Search