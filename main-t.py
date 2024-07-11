import asyncio

from app.neo4j_conc.neo4j_writer import Neo4jWriter

async def main():
    writer = Neo4jWriter("bolt://localhost:7687", "neo4j", "neo4jtest")
    await writer.write("CREATE (:Person {name: 'Alice'})")
    # writer.close()


if __name__ == '__main__':
    asyncio.run(main())