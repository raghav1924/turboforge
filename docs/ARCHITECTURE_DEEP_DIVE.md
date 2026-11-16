# TurboForge Architecture Deep Dive

Understanding the template synthesis pipeline:
1. `ManifestSynthesizer`: Dynamically computes package dependencies and version constraints.
2. `PipelineOrchestrator`: Assembles Turborepo task topologies across apps and internal packages.
3. `AgentPresetter`: Generates Model Context Protocol (MCP) server stdio bindings.
