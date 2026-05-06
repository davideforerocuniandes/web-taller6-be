import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdoptionRequestsService } from './adoption-requests.service';
import { CreateAdoptionRequestDto } from './dto/create-adoption-request.dto';
import { UpdateAdoptionRequestDto } from './dto/update-adoption-request.dto';

@ApiTags('adoption-requests')
@Controller('adoption-requests')
export class AdoptionRequestsController {
  constructor(
    private readonly adoptionRequestsService: AdoptionRequestsService,
  ) {}

  @ApiOperation({
    summary: 'Crear solicitud de adopción',
    description:
      'El animal debe estar en estado "disponible". No se permite duplicar la solicitud del mismo usuario para el mismo animal.',
  })
  @ApiResponse({ status: 201, description: 'Solicitud creada (status: pendiente)' })
  @ApiResponse({
    status: 400,
    description: 'Animal ya adoptado o solicitud duplicada',
  })
  @ApiResponse({ status: 404, description: 'Usuario o animal no encontrado' })
  @Post()
  create(@Body() dto: CreateAdoptionRequestDto) {
    return this.adoptionRequestsService.create(dto);
  }

  @ApiOperation({ summary: 'Listar todas las solicitudes' })
  @ApiResponse({ status: 200, description: 'Array de solicitudes con user y animal' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @Get()
  findAll() {
    return this.adoptionRequestsService.findAll();
  }

  @ApiOperation({ summary: 'Ver una solicitud específica' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Solicitud encontrada' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.adoptionRequestsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Aprobar o rechazar una solicitud',
    description:
      'Si se aprueba, el animal pasa automáticamente a estado "adoptado". Rechazar no cambia el estado del animal.',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Estado actualizado' })
  @ApiResponse({ status: 400, description: 'Status inválido (debe ser aprobada o rechazada)' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAdoptionRequestDto,
  ) {
    return this.adoptionRequestsService.updateStatus(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar una solicitud' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Solicitud eliminada' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.adoptionRequestsService.remove(id);
  }
}
